'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { FormData } from '@/types/user'

interface AuthFormProps {
    type: 'login' | 'register'
    onSuccess?: () => void
}

export default function AuthForm({ type, onSuccess }: AuthFormProps) {
    const { signIn, signUp, resetPassword, loading } = useAuth()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [showResetPassword, setShowResetPassword] = useState(false)

    const isLogin = type === 'login'
    const title = isLogin ? 'Iniciar Sesión' : 'Registrarse'

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
        setMessage('')
    }

    const validateForm = (): boolean => {
        if (!formData.email || !formData.password) {
            setError('Todos los campos son obligatorios')
            return false
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return false
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            if (isLogin) {
                await signIn(formData.email, formData.password)
            } else {
                await signUp(formData.email, formData.password)
                setMessage('Cuenta creada exitosamente')
            }
            onSuccess?.()
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.email) {
            setError('Ingresa tu email para recuperar la contraseña')
            return
        }

        try {
            await resetPassword(formData.email)
            setMessage('Se envió un email para restablecer tu contraseña')
            setShowResetPassword(false)
        } catch (err: any) {
            setError(err.message)
        }
    }

    if (showResetPassword) {
        return (
            <div style={styles.container}>
                <div style={styles.form}>
                    <h1 style={styles.title}>Recuperar Contraseña</h1>

                    <form onSubmit={handleResetPassword}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>

                        {error && <div style={styles.error}>{error}</div>}
                        {message && <div style={styles.success}>{message}</div>}

                        <button
                            type="submit"
                            style={styles.button}
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Enviar Email'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowResetPassword(false)}
                            style={styles.linkButton}
                        >
                            Volver al login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <h1 style={styles.title}>{title}</h1>

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Confirmar Contraseña:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    )}

                    {error && <div style={styles.error}>{error}</div>}
                    {message && <div style={styles.success}>{message}</div>}

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : title}
                    </button>

                    {isLogin && (
                        <button
                            type="button"
                            onClick={() => setShowResetPassword(true)}
                            style={styles.linkButton}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
    },
    form: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        textAlign: 'center' as const,
        marginBottom: '1.5rem',
        color: '#333'
    },
    inputGroup: {
        marginBottom: '1rem'
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        color: '#555'
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '1rem'
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        cursor: 'pointer',
        textDecoration: 'underline',
        width: '100%',
        textAlign: 'center' as const
    },
    error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem'
    },
    success: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem'
    }
}