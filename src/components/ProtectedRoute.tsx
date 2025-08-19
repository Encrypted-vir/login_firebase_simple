'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

interface ProtectedRouteProps {
    children: React.ReactNode
    requireAuth?: boolean
    redirectTo?: string
}

export default function ProtectedRoute({
    children,
    requireAuth = true,
    redirectTo = '/auth/login'
}: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            // Si requiere autenticación y no hay usuario, redirigir
            if (requireAuth && !user) {
                router.push(redirectTo)
                return
            }

            // Si no requiere autenticación pero hay usuario, redirigir
            if (!requireAuth && user) {
                router.push('/auth/profile')
                return
            }
        }
    }, [user, loading, requireAuth, redirectTo, router])

    // Mostrar loading mientras se verifica la autenticación
    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.spinner}></div>
                <p>Cargando...</p>
            </div>
        )
    }

    // Si requiere auth y no hay usuario, no mostrar contenido
    if (requireAuth && !user) {
        return null
    }

    // Si no requiere auth pero hay usuario, no mostrar contenido
    if (!requireAuth && user) {
        return null
    }

    return <>{children}</>
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
    }
}