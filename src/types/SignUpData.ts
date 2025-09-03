import type { User } from './User';

export type SignUpData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;

    refreshAccessToken: () => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (data: SignUpData) => Promise<boolean>;
    signOut: () => void;
};
