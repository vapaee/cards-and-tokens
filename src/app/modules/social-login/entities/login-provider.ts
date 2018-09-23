import { SocialUser } from './user';

export interface LoginProvider {
    initialize(): Promise<SocialUser>;
    isSignedIn(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}

