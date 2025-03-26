import { BASE_URL } from "api/constants/endpoints.constants";
import { getCurrentUser, initUser } from "api/services/users";
import { IUser } from "api/services/users/interfaces/user.interface";
import auth0 from "auth0-js";
import AuthSectionType from "types/authStore";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isEmailVerified: boolean | null;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  loginWithPopup: (email: string, password: string) => Promise<void>;
  loginWithSocial: (connection: string) => void;
  handleAuthentication: () => Promise<void>;
  shouldHandleAuthentication: boolean;
  forgotPassword: (email: string) => Promise<void>;
  logout: (params?: LogoutParams) => void;
  getAccessTokenSilently: () => Promise<string>;
  checkEmailVerification: () => Promise<void>;
  authSection: AuthSectionType | null;
  setAuthSection: (section: AuthSectionType) => void;
  clearStorage: () => void;
  setUser: (user: IUser | null) => void;
}

interface LogoutParams {
  logoutParams?: {
    returnTo?: string;
  };
}

export const authConfig = {
  domain: "dev-unik.us.auth0.com",
  clientId: "AcVDCo69b930HAWGiXZFTyTg95EkhtcR",
  redirectUri: window.location.origin,
};

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  clientID: authConfig.clientId,
  redirectUri: authConfig.redirectUri,
  responseType: "token id_token",
  scope: "read:current_user update:current_user_metadata openid email profile",
  audience: "https://dev-unik.us.auth0.com/api/v2/",
});

// Helper function to check if the token is expired
const isTokenExpired = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return true;

  try {
    const jwt = JSON.parse(atob(accessToken.split(".")[1])); // Decode payload
    const expiry = jwt.exp * 1000; // Convert expiry to milliseconds
    return Date.now() > expiry;
  } catch (error) {
    console.error("Failed to decode access token:", error);
    return true; // Assume expired on failure
  }
};

const authStateCreator: StateCreator<AuthState> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isEmailVerified: null,
  authSection: null,
  shouldHandleAuthentication: false,
  setAuthSection: (section) => set({ authSection: section }),

  loginWithPopup: async (email, password) => {
    set({ isLoading: true, error: null, shouldHandleAuthentication: false });
    return new Promise<void>((resolve, reject) => {
      webAuth.login(
        {
          realm: "Username-Password-Authentication",
          username: email,
          password,
        },
        async (err, authResult) => {
          if (err) {
            set({ error: "Invalid email or password", isLoading: false });
            reject(err);
            return;
          }
          if (authResult && authResult.idToken && authResult.accessToken) {
            localStorage.setItem("access_token", authResult.accessToken);
            localStorage.setItem("id_token", authResult.idToken);
            set({ isLoading: false, shouldHandleAuthentication: true });

            // Assuming user fetching is handled elsewhere
          } else {
            set({ error: "Authentication failed", isLoading: false });
            reject(new Error("Authentication failed"));
          }
        },
      );
    });
  },

  signupWithEmail: async (email, password) => {
    set({ isLoading: true, error: null, authSection: null });
    return new Promise<void>((resolve, reject) => {
      webAuth.signup(
        {
          connection: "Username-Password-Authentication",
          email,
          password,
        },
        async (err) => {
          if (err) {
            set({
              error: "Signup failed",
              isLoading: false,
            });
            reject(err);
            return;
          }
          // After successful signup, log in the user
          try {
            console.log("await get().loginWithPopup(email, password);");
            await get().loginWithPopup(email, password);
            set({
              isLoading: false,
              isEmailVerified: false,
              authSection: "verifyEmail",
            });
            resolve();
          } catch (loginErr) {
            set({
              error: "Signup succeeded but login failed",
              isLoading: false,
            });
            reject(loginErr);
          }
        },
      );
    });
  },

  loginWithSocial: (connection) => {
    set({ isLoading: true, error: null, shouldHandleAuthentication: false });
    webAuth.authorize({ connection });
    set({
      isLoading: false,
      authSection: null,
      shouldHandleAuthentication: true,
    });
  },

  handleAuthentication: async () => {
    return new Promise<void>((resolve, reject) => {
      webAuth.parseHash(async (err, result) => {
        console.log("handleAuthentication", err, result);
        if (result && result.accessToken && result.idToken) {
          const { email_verified: emailVerified } = result.idTokenPayload;
          localStorage.setItem("access_token", result.accessToken);
          localStorage.setItem("id_token", result.idToken);

          try {
            let user;
            try {
              user = await getCurrentUser();
              if (!user) {
                user = await initUser();
              }
            } catch (error) {
              console.log(
                "Error fetching current user, attempting to initialize user:",
                error,
              );
              user = await initUser();
              user = await getCurrentUser();
            }

            if (!user) {
              throw new Error("User not found");
            }

            set({
              user,
              isAuthenticated: true,
              isEmailVerified: emailVerified,
              isLoading: false,
              authSection: emailVerified ? null : "verifyEmail",
              shouldHandleAuthentication: false,
            });

            resolve();
          } catch (error) {
            console.log(error);
            set({
              error: "Failed to fetch user data",
              isLoading: false,
              shouldHandleAuthentication: false,
            });
            reject(error);
          }
        } else if (err) {
          set({
            error: err.errorDescription,
            isLoading: false,
            isAuthenticated: false,
            authSection: "login",
            shouldHandleAuthentication: false,
          });
          reject(err);
        }
      });
    });
  },

  checkEmailVerification: async () => {
    set({ isLoading: true, error: null });
    return new Promise<void>((resolve, reject) => {
      webAuth.client.userInfo(
        localStorage.getItem("access_token")!,
        (err, user) => {
          if (err) {
            set({
              error: "Failed to check email verification status",
              isLoading: false,
            });
            reject(err);
            return;
          }
          const { email_verified: emailVerified } = user;
          set({
            isEmailVerified: emailVerified,
            isLoading: false,
            authSection: null,
          });
          if (emailVerified) {
            set({
              authSection: null,
            });
            window.location.href = authConfig.redirectUri;
          }
          resolve();
        },
      );
    });
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    return new Promise<void>((resolve, reject) => {
      webAuth.changePassword(
        {
          connection: "Username-Password-Authentication",
          email,
        },
        (err) => {
          if (err) {
            set({
              error: "Failed to send reset password link",
              isLoading: false,
            });
            reject(err);
            return;
          }
          set({ isLoading: false });
          resolve();
        },
      );
    });
  },

  logout: (params?: LogoutParams) => {
    const returnTo = params?.logoutParams?.returnTo || BASE_URL;
    webAuth.logout({ returnTo });
    get().clearStorage();
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isEmailVerified: null,
      authSection: null,
      shouldHandleAuthentication: false,
    });
  },

  getAccessTokenSilently: async () => {
    console.log("getAccessTokenSilently");

    // First try to get the token from localStorage
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && !isTokenExpired()) {
      return accessToken;
    }

    console.log("Token expired or not found, attempting to refresh");

    // Try to refresh the token
    return new Promise<string>((resolve, reject) => {
      webAuth.checkSession({}, async (err, result) => {
        if (err) {
          console.log("Failed to refresh token silently", err);

          // If the error is not related to authentication, reject immediately
          if (
            err.error !== "login_required" &&
            err.error !== "consent_required"
          ) {
            reject(err);
            return;
          }

          // For authentication-related errors, try to trigger a new login
          set({ isAuthenticated: false, authSection: "login" });
          reject(new Error("Authentication required"));
        } else if (result && result.accessToken && result.idToken) {
          // Successfully refreshed the token
          localStorage.setItem("access_token", result.accessToken);
          localStorage.setItem("id_token", result.idToken);
          set({ isAuthenticated: true, authSection: null });
          resolve(result.accessToken);
        } else {
          reject(new Error("Failed to refresh token"));
        }
      });
    });
  },

  clearStorage: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("auth-storage");
    sessionStorage.removeItem("auth-storage");
  },

  setUser: (user: IUser | null) => {
    set({ user });
    set({ authSection: null });
  },
});

export const useAuthStore = create<AuthState>()(
  persist(authStateCreator, { name: "auth-storage" }),
);
