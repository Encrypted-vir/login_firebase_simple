export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={styles.authLayout}>
            <nav style={styles.nav}>
                <a href="/" style={styles.logo}>
                    🔐 Firebase Auth
                </a>
            </nav>
            <main style={styles.main}>
                {children}
            </main>
        </div>
    )
}

const styles = {
    authLayout: {
        minHeight: '100vh',
        backgroundColor: '#f5f7fa'
    },
    nav: {
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e1e8ed',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1a202c',
        textDecoration: 'none'
    },
    main: {
        flex: 1
    }
}