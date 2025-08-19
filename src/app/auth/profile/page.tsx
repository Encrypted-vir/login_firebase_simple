'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import ProtectedRoute from '@/components/ProtectedRoute'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ProfilePage() {
    const { user, signOut } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSignOut = async () => {
        try {
            setLoading(true)
            await signOut()
            router.push('/')
        } catch (err: any) {
            setError('Error al cerrar sesión')
        } finally {
            setLoading(false)
        }
    }

    const handleSendVerification = async () => {
        if (!user || !auth.currentUser) return

        try {
            setLoading(true)
            setError('')
            await sendEmailVerification(auth.currentUser)
            setMessage('Email de verificación enviado. Revisa tu bandeja de entrada.')
        } catch (err: any) {
            setError('Error al enviar email de verificación')
        } finally {
            setLoading(false)
        }
    }

    if (!user) return null

    return (
        <ProtectedRoute requireAuth={true}>
            <div style={styles.container}>
                <div style={styles.profileCard}>
                    <div style={styles.header}>
                        <div style={styles.avatar}>
                            {user.email?.[0]?.toUpperCase() || '👤'}
                        </div>
                        <h1 style={styles.title}>Mi Perfil</h1>
                    </div>

                    <div style={styles.content}>
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Información Personal</h2>

                            <div style={styles.field}>
                                <label style={styles.label}>Email:</label>
                                <p style={styles.value}>{user.email}</p>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>UID:</label>
                                <p style={styles.valueSmall}>{user.uid}</p>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Estado de verificación:</label>
                                <div style={styles.verification}>
                                    {user.emailVerified ? (
                                        <span style={styles.verified}>✅ Verificado</span>
                                    ) : (
                                        <div>
                                            <span style={styles.unverified}>❌ No verificado</span>
                                            <button
                                                onClick={handleSendVerification}
                                                style={styles.verifyButton}
                                                disabled={loading}
                                            >
                                                {loading ? 'Enviando...' : 'Verificar Email'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Fecha de creación:</label>
                                <p style={styles.value}>
                                    {user.metadata?.creationTime ?
                                        new Date(user.metadata.creationTime).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : 'No disponible'}
                                </p>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Último acceso:</label>
                                <p style={styles.value}>
                                    {user.metadata?.lastSignInTime ?
                                        new Date(user.metadata.lastSignInTime).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : 'No disponible'}
                                </p>
                            </div>
                        </div>

                        {message && <div style={styles.success}>{message}</div>}
                        {error && <div style={styles.error}>{error}</div>}

                        <div style={styles.actions}>
                            <button
                                onClick={() => router.push('/')}
                                style={styles.homeButton}
                            >
                                🏠 Ir al Inicio
                            </button>

                            <button
                                onClick={handleSignOut}
                                style={styles.signOutButton}
                                disabled={loading}
                            >
                                {loading ? 'Cerrando...' : '🚪 Cerrar Sesión'}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={styles.securityInfo}>
                    <h3 style={styles.securityTitle}>🔒 Información de Seguridad</h3>
                    <ul style={styles.securityList}>
                        <li>Tu sesión está protegida por Firebase Authentication</li>
                        <li>Recomendamos verificar tu email para mayor seguridad</li>
                        <li>Cierra sesión cuando uses dispositivos públicos</li>
                        <li>No compartas tu información de acceso</li>
                    </ul>
                </div>
            </div>
        </ProtectedRoute>
    )
}

const styles = {
    container: {
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem',
        backgroundColor: '#f5f7fa'
    },
    profileCard: {
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    },
    header: {
        backgroundColor: '#007bff',
        padding: '2rem',
        textAlign: 'center' as const,
        color: 'white'
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        margin: '0 auto 1rem auto'
    },
    title: {
        fontSize: '2rem',
        margin: 0
    },
    content: {
        padding: '2rem'
    },
    section: {
        marginBottom: '2rem'
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#333',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '0.5rem'
    },
    field: {
        marginBottom: '1.5rem'
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        color: '#555',
        marginBottom: '0.5rem'
    },
    value: {
        color: '#333',
        fontSize: '1.1rem'
    },
    valueSmall: {
        color: '#666',
        fontSize: '0.9rem',
        fontFamily: 'monospace',
        wordBreak: 'break-all' as const
    },
    verification: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    verified: {
        color: '#28a745',
        fontWeight: 'bold'
    },
    unverified: {
        color: '#dc3545',
        fontWeight: 'bold'
    },
    verifyButton: {
        marginLeft: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem'
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '2rem'
    },
    homeButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    signOutButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    success: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem'
    },
    error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem'
    },
    securityInfo: {
        maxWidth: '600px',
        margin: '2rem auto 0',
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    securityTitle: {
        color: '#333',
        marginBottom: '1rem'
    },
    securityList: {
        color: '#666',
        lineHeight: '1.6'
    }
}