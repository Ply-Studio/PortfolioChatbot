import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  auth,
  db,
  signInWithGoogle,
  logOut,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import {
  WidgetSettings,
  Project,
  ResumeKnowledge,
  Conversation,
  Message,
  RecruiterLead,
  DEFAULT_WIDGET_SETTINGS,
  DEFAULT_RESUME_TEXT,
  DEFAULT_PROJECTS,
} from '../types';

interface AppContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  settings: WidgetSettings;
  projects: Project[];
  resume: ResumeKnowledge;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  recruiterLead: RecruiterLead | null;
  isWidgetOpen: boolean;
  currentView: 'portfolio' | 'admin';
  setIsWidgetOpen: (open: boolean) => void;
  setCurrentView: (view: 'portfolio' | 'admin') => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveSettings: (newSettings: WidgetSettings) => Promise<void>;
  saveResume: (resumeText: string, summary?: string, fileName?: string) => Promise<void>;
  saveProject: (project: Omit<Project, 'id'> & { id?: string }) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  endConversation: () => void;
  startRecruiterConversation: (lead: RecruiterLead) => Promise<Conversation>;
  sendMessage: (text: string) => Promise<void>;
  isSendingMessage: boolean;
  updateConversationStatus: (id: string, status: Conversation['status'], notes?: string) => Promise<void>;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [settings, setSettings] = useState<WidgetSettings>(DEFAULT_WIDGET_SETTINGS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resume, setResume] = useState<ResumeKnowledge>({
    resumeText: DEFAULT_RESUME_TEXT,
    summary: 'Senior Product Designer & Design Technologist with 7+ years in enterprise SaaS & AI interfaces.',
    updatedAt: new Date().toISOString(),
  });
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [recruiterLead, setRecruiterLead] = useState<RecruiterLead | null>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>('portfolio');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Check if current user is admin based on email
  const isAdmin = Boolean(
    currentUser?.email &&
      (currentUser.email.toLowerCase() === 'ivan.zhao@ivanzhao.design' ||
        currentUser.email.toLowerCase() === 'ivan.zhao.gd@gmail.com' ||
        settings.allowedAdminEmails.some(
          (e) => e.toLowerCase() === currentUser.email?.toLowerCase()
        ))
  );

  // Track Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync Widget Settings from Firestore
  useEffect(() => {
    const settingsDocRef = doc(db, 'settings', 'widget');
    const unsub = onSnapshot(
      settingsDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as WidgetSettings;
          setSettings({
            ...DEFAULT_WIDGET_SETTINGS,
            ...data,
          });
        } else {
          // Initialize with default settings if not exists
          setSettings(DEFAULT_WIDGET_SETTINGS);
        }
      },
      (error) => {
        console.warn('Failed to listen to settings/widget, using defaults:', error);
      }
    );
    return () => unsub();
  }, []);

  // Sync Resume Knowledge from Firestore
  useEffect(() => {
    const resumeDocRef = doc(db, 'knowledge', 'resume');
    const unsub = onSnapshot(
      resumeDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as ResumeKnowledge;
          setResume(data);
        }
      },
      (error) => {
        console.warn('Failed to listen to knowledge/resume, using default resume:', error);
      }
    );
    return () => unsub();
  }, []);

  // Sync Projects from Firestore
  useEffect(() => {
    const projectsColRef = collection(db, 'projects');
    const unsub = onSnapshot(
      projectsColRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedProjects: Project[] = snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Project, 'id'>),
          }));
          setProjects(loadedProjects);
        } else {
          // Use default sample projects if Firestore is empty
          const fallback: Project[] = DEFAULT_PROJECTS.map((p, idx) => ({
            ...p,
            id: `proj_default_${idx + 1}`,
          }));
          setProjects(fallback);
        }
      },
      (error) => {
        console.warn('Failed to listen to projects, using fallback sample projects:', error);
        const fallback: Project[] = DEFAULT_PROJECTS.map((p, idx) => ({
          ...p,
          id: `proj_default_${idx + 1}`,
        }));
        setProjects(fallback);
      }
    );
    return () => unsub();
  }, []);

  // Sync Conversations (Only if user is Admin or active session exists)
  useEffect(() => {
    if (!isAdmin) {
      setConversations([]);
      return;
    }

    const convColRef = collection(db, 'conversations');
    const convQuery = query(convColRef, orderBy('updatedAt', 'desc'));

    const unsub = onSnapshot(
      convQuery,
      (snapshot) => {
        const list: Conversation[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Conversation, 'id'>),
        }));
        setConversations(list);
      },
      (error) => {
        console.warn('Conversations list error:', error);
      }
    );

    return () => unsub();
  }, [isAdmin]);

  // Auth actions
  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      setNotification('Signed in with Google successfully.');
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setNotification(err.message || 'Could not sign in with Google');
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setCurrentView('portfolio');
      setNotification('Logged out successfully.');
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  // Save Settings
  const saveSettings = async (newSettings: WidgetSettings) => {
    const path = 'settings/widget';
    try {
      const docRef = doc(db, 'settings', 'widget');
      await setDoc(docRef, {
        ...newSettings,
        updatedAt: new Date().toISOString(),
      });
      setSettings(newSettings);
      setNotification('Widget customizations saved successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Save Resume Knowledge
  const saveResume = async (resumeText: string, summary?: string, fileName?: string) => {
    const path = 'knowledge/resume';
    try {
      const docRef = doc(db, 'knowledge', 'resume');
      const payload: ResumeKnowledge = {
        resumeText,
        summary: summary || resume.summary || 'Ivan Zhao Product Designer Resume',
        uploadedFileName: fileName || resume.uploadedFileName || 'Ivan_Zhao_Resume.pdf',
        updatedAt: new Date().toISOString(),
      };
      await setDoc(docRef, payload);
      setResume(payload);
      setNotification('Resume data updated for Cyber Ivan AI!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Save / Update Project
  const saveProject = async (projectData: Omit<Project, 'id'> & { id?: string }) => {
    const id = projectData.id || `proj_${Date.now()}`;
    const path = `projects/${id}`;
    try {
      const docRef = doc(db, 'projects', id);
      const payload: Omit<Project, 'id'> = {
        title: projectData.title,
        url: projectData.url,
        role: projectData.role,
        year: projectData.year || '2024',
        tags: projectData.tags || [],
        description: projectData.description,
        highlights: projectData.highlights || '',
        isFeatured: Boolean(projectData.isFeatured),
        createdAt: projectData.createdAt || new Date().toISOString(),
      };
      await setDoc(docRef, payload);
      setNotification(`Project "${projectData.title}" saved successfully!`);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Delete Project
  const deleteProject = async (projectId: string) => {
    const path = `projects/${projectId}`;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setNotification('Project deleted.');
    } catch (error) {
      console.warn('Could not delete project from Firestore:', error);
      setNotification('Project deleted.');
    }
  };

  // Delete Recruiter Conversation & Lead Registry Record
  const deleteConversation = async (conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    if (activeConversation?.id === conversationId) {
      setActiveConversation(null);
    }
    try {
      await deleteDoc(doc(db, 'conversations', conversationId));
      setNotification('Recruiter conversation and lead record deleted.');
    } catch (error) {
      console.warn('Could not delete conversation from Firestore:', error);
      setNotification('Recruiter conversation and lead record deleted.');
    }
  };

  // End active conversation for user/recruiter
  const endConversation = () => {
    setActiveConversation(null);
    setRecruiterLead(null);
    setNotification('Conversation ended.');
  };

  // Start recruiter conversation (Feature 6: lead capture before chatting)
  const startRecruiterConversation = async (lead: RecruiterLead): Promise<Conversation> => {
    const convId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const path = `conversations/${convId}`;

    const initialMessage: Message = {
      id: `msg_welcome_${Date.now()}`,
      sender: 'assistant',
      text: settings.greetingMessage || DEFAULT_WIDGET_SETTINGS.greetingMessage,
      timestamp: Date.now(),
    };

    const newConversation: Conversation = {
      id: convId,
      recruiterName: lead.name,
      recruiterEmail: lead.email,
      recruiterCompany: lead.company,
      recruiterRole: lead.role || '',
      messages: [initialMessage],
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
      status: 'new',
    };

    setRecruiterLead(lead);
    setActiveConversation(newConversation);

    try {
      const docRef = doc(db, 'conversations', convId);
      await setDoc(docRef, newConversation);
    } catch (error) {
      console.warn('Could not persist initial conversation to Firestore:', error);
      // Still allow visitor to chat locally in-memory
    }

    return newConversation;
  };

  // Send message in active conversation
  const sendMessage = async (userText: string) => {
    if (!activeConversation || !userText.trim()) return;

    const userMessage: Message = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...activeConversation.messages, userMessage];

    const currentConv = {
      ...activeConversation,
      messages: updatedMessages,
      updatedAt: new Date().toISOString(),
    };

    setActiveConversation(currentConv);
    setIsSendingMessage(true);

    try {
      // Call server-side Gemini API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          resumeText: resume.resumeText,
          projects,
          chatbotName: settings.chatbotName,
          chatbotTitle: settings.chatbotTitle,
          portfolioUrl: settings.portfolioUrl,
          recruiterInfo: recruiterLead || {
            name: currentConv.recruiterName,
            email: currentConv.recruiterEmail,
            company: currentConv.recruiterCompany,
            role: currentConv.recruiterRole,
          },
        }),
      });

      let replyText = '';
      if (response.ok) {
        const data = await response.json();
        replyText = data.reply || "Thanks for your question! I'm happy to provide more details about Ivan's work.";
      } else {
        const errorData = await response.json().catch(() => ({}));
        replyText = errorData.error
          ? `(AI Twin Note: ${errorData.error}. As Cyber Ivan, I can share that Ivan has extensive experience in product design, design systems, and AI workflows. Please reach out to ivan.zhao@ivanzhao.design!)`
          : "Thank you for reaching out! I'd love to discuss my design process and project experience in detail. Please feel free to email me directly at ivan.zhao@ivanzhao.design.";
      }

      const botMessage: Message = {
        id: `msg_bot_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      const finalConv = {
        ...currentConv,
        messages: finalMessages,
        updatedAt: new Date().toISOString(),
      };

      setActiveConversation(finalConv);

      // Persist full conversation transcript to Firestore (Feature 5)
      try {
        const docRef = doc(db, 'conversations', finalConv.id);
        await updateDoc(docRef, {
          messages: finalMessages,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Could not update conversation transcript in Firestore:', err);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackBotMessage: Message = {
        id: `msg_bot_err_${Date.now()}`,
        sender: 'assistant',
        text: "I'm having a brief connection hitch, but as Ivan's cyber avatar, I can assure you that Ivan specializes in 0-to-1 product design, design systems, and AI applications. Please reach out to ivan.zhao@ivanzhao.design!",
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, fallbackBotMessage];
      setActiveConversation({
        ...currentConv,
        messages: finalMessages,
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Update conversation status and notes (for Admin review)
  const updateConversationStatus = async (
    id: string,
    status: Conversation['status'],
    notes?: string
  ) => {
    const path = `conversations/${id}`;
    try {
      const docRef = doc(db, 'conversations', id);
      await updateDoc(docRef, {
        status,
        ...(notes !== undefined ? { notes } : {}),
        updatedAt: new Date().toISOString(),
      });
      setNotification('Conversation updated.');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAuthLoading,
        settings,
        projects,
        resume,
        conversations,
        activeConversation,
        recruiterLead,
        isWidgetOpen,
        currentView,
        setIsWidgetOpen,
        setCurrentView,
        loginWithGoogle,
        logout,
        saveSettings,
        saveResume,
        saveProject,
        deleteProject,
        deleteConversation,
        endConversation,
        startRecruiterConversation,
        sendMessage,
        isSendingMessage,
        updateConversationStatus,
        notification,
        setNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
