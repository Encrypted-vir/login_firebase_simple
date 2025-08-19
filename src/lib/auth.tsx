'use client'
import React from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    User
} from 'firebase/auth'
import { auth } from './firebase'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthContextType, AuthUser } from '@/types/user'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
            if (firebaseUser) {
                // Crear objeto AuthUser con solo las propiedades que necesitamos
                const authUser: AuthUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    emailVerified: firebaseUser.emailVerified,
                    // Propiedades adicionales del User original que podrías necesitar
                    metadata: firebaseUser.metadata,
                    providerId: firebaseUser.providerId,
                    providerData: firebaseUser.providerData,
                    refreshToken: firebaseUser.refreshToken,
                    tenantId: firebaseUser.tenantId,
                    delete: firebaseUser.delete,
                    getIdToken: firebaseUser.getIdToken,
                    getIdTokenResult: firebaseUser.getIdTokenResult,
                    reload: firebaseUser.reload,
                    toJSON: firebaseUser.toJSON,
                    isAnonymous: firebaseUser.isAnonymous,
                    phoneNumber: firebaseUser.phoneNumber,
                    photoURL: firebaseUser.photoURL
                }
                setUser(authUser)
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signUp = async (email: string, password: string): Promise<void> => {
        try {
            setLoading(true)
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            throw new Error(getErrorMessage(error.code))
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (email: string, password: string): Promise<void> => {
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            throw new Error(getErrorMessage(error.code))
        } finally {
            setLoading(false)
        }
    }

    const signOut = async (): Promise<void> => {
        try {
            await firebaseSignOut(auth)
        } catch (error: any) {
            throw new Error('Error al cerrar sesión')
        }
    }

    const resetPassword = async (email: string): Promise<void> => {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (error: any) {
            throw new Error(getErrorMessage(error.code))
        }
    }

    const value: AuthContextType = {
        user,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword
    }

    return <AuthContext.Provider value={ value }> { children } </AuthContext.Provider>
}

// Mensajes de error en español
function getErrorMessage(errorCode: string): string {
    const messages: Record<string, string> = {
        'auth/email-already-in-use': 'Este email ya está registrado',
        'auth/invalid-email': 'Email inválido',
        'auth/operation-not-allowed': 'Operación no permitida',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/invalid-credential': 'Credenciales inválidas',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
        'auth/network-request-failed': 'Error de conexión'
    }

    return messages[errorCode] || 'Error inesperado. Intenta nuevamente'
}