'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function RegisterPage() {
    const router = useRouter()

    const handleRegisterSuccess = () => {
        router.push('/auth/profile')
    }

    return (
        <ProtectedRoute requireAuth={false}>
            <div style={styles.container}>
                <AuthForm type="register" onSuccess={handleRegisterSuccess} />

                <div style={styles.footer}>
                    <p>¿Ya tienes cuenta?</p>
                    <Link href="/auth/login" style={styles.link}>
                        Inicia sesión aquí
                    </Link>
                </div>

                <div style={styles.terms}>
                    <p style={styles.termsText}>
                        Al registrarte, aceptas nuestros términos de servicio y política de privacidad
                    </p>
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
    },
    terms: {
        marginTop: '1.5rem',
        maxWidth: '400px',
        textAlign: 'center' as const
    },
    termsText: {
        fontSize: '0.875rem',
        color: '#888',
        lineHeight: '1.4'
    }
}