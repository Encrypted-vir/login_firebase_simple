'use client'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🔐 Firebase Auth Template</h1>
        <p style={styles.subtitle}>Sistema de autenticación seguro</p>

        {user ? (
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <h2>¡Bienvenido!</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>UID:</strong> {user.uid}</p>
              <p><strong>Verificado:</strong> {user.emailVerified ? '✅' : '❌'}</p>
            </div>

            <div style={styles.buttonGroup}>
              <Link href="/auth/profile" style={styles.button}>
                Ver Perfil
              </Link>
              <button
                onClick={() => window.location.href = '/auth/logout'}
                style={{ ...styles.button, backgroundColor: '#dc3545' }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.guestSection}>
            <p style={styles.description}>
              Inicia sesión o regístrate para acceder a las funciones protegidas
            </p>

            <div style={styles.buttonGroup}>
              <Link href="/auth/login" style={styles.button}>
                Iniciar Sesión
              </Link>
              <Link href="/auth/register" style={{ ...styles.button, backgroundColor: '#28a745' }}>
                Registrarse
              </Link>
            </div>
          </div>
        )}

        <div style={styles.features}>
          <h3>✨ Características incluidas:</h3>
          <ul style={styles.featureList}>
            <li>🔒 Autenticación con Firebase</li>
            <li>🛡️ Rutas protegidas</li>
            <li>📧 Recuperación de contraseña</li>
            <li>⚡ TypeScript + Next.js 13+</li>
            <li>🎨 Diseño responsive simple</li>
            <li>🚀 Listo para producción</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center' as const
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#333'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem'
  },
  userSection: {
    marginBottom: '2rem'
  },
  userInfo: {
    backgroundColor: '#e7f3ff',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    textAlign: 'left' as const
  },
  guestSection: {
    marginBottom: '2rem'
  },
  description: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '1.5rem'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const
  },
  button: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  features: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'left' as const
  },
  featureList: {
    listStyle: 'none',
    marginTop: '1rem'
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