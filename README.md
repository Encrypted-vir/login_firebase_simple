# Next.js + Firebase Authentication Template

Esta es una plantilla de Next.js con autenticación usando Firebase, TypeScript y TailwindCSS. Incluye un sistema completo de autenticación con registro, inicio de sesión y recuperación de contraseña.

## 🚀 Características

- ⚡ Next.js 15.4 con App Router
- 🔐 Autenticación con Firebase
- 💎 TypeScript
- 🎨 TailwindCSS
- 🔒 Rutas protegidas
- 📱 Diseño responsive
- 🔄 Manejo de estado de autenticación
- 📧 Recuperación de contraseña

## 📋 Prerrequisitos

- Node.js 18.0 o superior
- npm o yarn
- Una cuenta en Firebase

## 🛠 Instalación

1. Clona este repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Configura Firebase:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Añade una nueva aplicación web
   - Obtén las credenciales de configuración

4. Configura las variables de entorno:
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Añade las siguientes variables con tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── auth/              # Rutas de autenticación
│   │   ├── login/        # Página de inicio de sesión
│   │   ├── register/     # Página de registro
│   │   ├── profile/      # Página de perfil (protegida)
│   │   └── logout/       # Página de cierre de sesión
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página principal
├── components/            # Componentes reutilizables
│   ├── AuthForm.tsx      # Formulario de autenticación
│   └── ProtectedRoute.tsx # Componente para rutas protegidas
├── lib/                   # Utilidades y configuraciones
│   ├── auth.tsx          # Contexto de autenticación
│   └── firebase.ts       # Configuración de Firebase
└── types/                # Tipos de TypeScript
    └── user.ts           # Tipos relacionados con usuarios
```

## 🔒 Rutas Protegidas

Para proteger una ruta, envuelve el componente con `ProtectedRoute`:

```typescript
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      {/* Contenido protegido */}
    </ProtectedRoute>
  )
}
```

## 🔑 Uso de la Autenticación

```typescript
import { useAuth } from '@/lib/auth'

export default function MiComponente() {
  const { user, signIn, signOut, signUp } = useAuth()
  
  // Usar las funciones de autenticación según necesidad
}
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## 🚀 Despliegue

Esta plantilla está lista para ser desplegada en Vercel:

1. Sube tu repositorio a GitHub
2. Ve a [Vercel](https://vercel.com)
3. Importa tu repositorio
4. Configura las variables de entorno
5. ¡Despliega!

## ⚠️ Consideraciones de Seguridad

1. Nunca expongas tus credenciales de Firebase
2. Mantén actualizadas todas las dependencias
3. Implementa validación adicional según tus necesidades
4. Considera añadir reCAPTCHA para el formulario de login
5. Implementa rate limiting en producción

## 📝 Personalización

1. Modifica los estilos en `globals.css`
2. Actualiza los componentes de autenticación según tus necesidades
3. Añade más campos al registro si es necesario
4. Personaliza los mensajes de error
5. Ajusta las reglas de validación en `AuthForm.tsx`

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
