
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'fishing_local_session';

type Session = {
  userId: string;
  token: string;
};

type AuthContextType = {
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  signIn: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore a saved session when the app starts
  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const saved = await SecureStore.getItemAsync(SESSION_KEY);

        if (saved) {
          const parsed: unknown = JSON.parse(saved);

          if (
            parsed !== null &&
            typeof parsed === 'object' &&
            'userId' in parsed &&
            typeof parsed.userId === 'string' &&
            'token' in parsed &&
            typeof parsed.token === 'string' &&
            parsed.userId.length > 0 &&
            parsed.token.length > 0
          ) {
            if (active) {
              setSession({
                userId: parsed.userId,
                token: parsed.token,
              });
            }
          }
        }
      } catch (error) {
        console.error('Could not restore session:', error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  // Called after a successful login
  async function signIn(userId: string) {
    if (!userId.trim()) {
      throw new Error('Missing AccountId');
    }

    const newSession: Session = {
      userId,
      token: Crypto.randomUUID(),
    };

    await SecureStore.setItemAsync(
      SESSION_KEY,
      JSON.stringify(newSession)
    );

    setSession(newSession);
  }

  // Called when the user logs out
  async function signOut() {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        userId: session?.userId ?? null,
        token: session?.token ?? null,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be inside AuthContextProvider');
  }

  return context;
}
