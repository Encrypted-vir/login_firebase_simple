import { User } from 'firebase/auth'

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
    emailVerified: boolean
    metadata?: User['metadata']
    providerId: string
    providerData: User['providerData']
    refreshToken: string
    tenantId: string | null
    delete: User['delete']
    getIdToken: User['getIdToken']
    getIdTokenResult: User['getIdTokenResult']
    reload: User['reload']
    toJSON: User['toJSON']
    isAnonymous: boolean
    phoneNumber: string | null
    photoURL: string | null
}

export interface AuthContextType {
    user: AuthUser | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
}

export interface FormData {
    email: string
    password: string
    confirmPassword?: string
}