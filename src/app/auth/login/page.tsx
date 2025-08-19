'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function LoginPage() {
    const router = useRouter()

    const handleLoginSuccess = () => {
        router.push('/auth/profile')
    }

    return (
        <ProtectedRoute requireAuth={false}>
            <div style={styles.container}>
                <AuthForm type="login" onSuccess={handleLoginSuccess} />

                <div style={styles.footer}>
                    <p>¿No tienes cuenta?</p>
                    <Link href="/auth/register" style={styles.link}>
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </ProtectedRoute>
    )
}

const styles = {
    container: {
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        textAlign: 'center' as const,
        marginTop: '1rem',
        color: '#666'
    },
    link: {
        color: '#007bff',
        textDecoration: 'underline',
        marginLeft: '0.5rem'
    }
}