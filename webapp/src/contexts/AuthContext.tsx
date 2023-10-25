import * as React from "react";

const AuthContext = React.createContext<{
  authData: TokenData | null;
  isLoading: boolean;
  setAuthData: React.Dispatch<React.SetStateAction<TokenData | null>>;
}>({
  authData: null,
  isLoading: true,
  setAuthData: () => {},
});

export type TokenData = {
  id: string;
  email: string;
  name: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { authData, setAuthData, isLoading } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        authData,
        isLoading,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Auth hook
export function useAuth() {
  const [isLoading, setLoading] = React.useState(true);
  const [authData, setAuthData] = React.useState<TokenData | null>({
    id: "",
    email: "",
    name: "",
  });

  React.useEffect(() => {
    const initializeAuth = async () => {
      const response = await fetch("/api/auth/check-auth", {
        credentials: "include",
      });
      if (response.ok) {
        const json = await response.json();
        setAuthData(json.data);
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  return { authData, setAuthData, isLoading };
}
