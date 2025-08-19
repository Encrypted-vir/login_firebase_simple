'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function LogoutPage() {
    const { signOut, user } = useAuth()
    const router = useRouter()
    const [status, setStatus] = useState<'signing-out' | 'success' | 'error'>('signing-out')
    const [error, setError] = useState('')

    useEffect(() => {
        const handleSignOut = async () => {
            if (!user) {
                router.push('/')
                return
            }

            try {
                await signOut()
                setStatus('success')

                // Redirigir después de 2 segundos
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            } catch (err: any) {
                setStatus('error')
                setError('Error al cerrar sesión. Intenta nuevamente.')
            }
        }

        handleSignOut()
    }, [signOut, user, router])

    const handleGoHome = () => {
        router.push('/')
    }

    const handleTryAgain = async () => {
        setStatus('signing-out')
        try {
            await signOut()
            setStatus('success')
            setTimeout(() => {
                router.push('/')
            }, 2000)
        } catch (err: any) {
            setStatus('error')
            setError('Error al cerrar sesión. Intenta nuevamente.')
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {status === 'signing-out' && (
                    <div style={styles.content}>
                        <div style={styles.spinner}></div>
                        <h2 style={styles.title}>Cerrando sesión...</h2>
                        <p style={styles.message}>Por favor espera un momento</p>
                    </div>
                )}

                {status === 'success' && (
                    <div style={styles.content}>
                        <div style={styles.successIcon}>✅</div>
                        <h2 style={styles.title}>Sesión cerrada exitosamente</h2>
                        <p style={styles.message}>Serás redirigido al inicio en breve</p>
                        <button onClick={handleGoHome} style={styles.button}>
                            Ir al inicio ahora
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div style={styles.content}>
                        <div style={styles.errorIcon}>❌</div>
                        <h2 style={styles.title}>Error al cerrar sesión</h2>
                        <p style={styles.error}>{error}</p>
                        <div style={styles.buttonGroup}>
                            <button onClick={handleTryAgain} style={styles.button}>
                                Intentar nuevamente
                            </button>
                            <button onClick={handleGoHome} style={{ ...styles.button, backgroundColor: '#6c757d' }}>
                                Ir al inicio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center' as const,
        maxWidth: '400px',
        width: '100%'
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '1rem'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    successIcon: {
        fontSize: '3rem',
        marginBottom: '0.5rem'
    },
    errorIcon: {
        fontSize: '3rem',
        marginBottom: '0.5rem'
    },
    title: {
        color: '#333',
        fontSize: '1.5rem',
        margin: 0
    },
    message: {
        color: '#666',
        fontSize: '1rem',
        margin: 0
    },
    error: {
        color: '#dc3545',
        fontSize: '1rem',
        margin: 0
    },
    button: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginTop: '1rem'
    },
    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem'
    }
}