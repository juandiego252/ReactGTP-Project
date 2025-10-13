# Penguin GPT

![81shots_so](https://github.com/user-attachments/assets/c22ea39a-139a-4525-9001-79796459b239)

## Descripción

Penguin GPT es una aplicación web moderna desarrollada con React y TypeScript que ofrece múltiples servicios de inteligencia artificial en una interfaz amigable. El proyecto está diseñado como un dashboard interactivo que permite a los usuarios acceder a diversas capacidades de procesamiento de lenguaje natural, generación de imágenes, y conversión de audio a texto/texto a audio.

## Características Principales

### 🖋️ Corrección Ortográfica
- Análisis de textos y sugerencias de corrección ortográfica en tiempo real
- Detección de errores gramaticales y de puntuación

### 🎤 Conversión de Audio a Texto
- Transcripción precisa de archivos de audio a texto
- Soporte para múltiples idiomas

### 📝 Conversión de Texto a Audio
- Generación de audio natural a partir de texto ingresado
- Diferentes voces y tonos disponibles

### 🖼️ Generación de Imágenes
- Creación de imágenes basadas en descripciones textuales
- Opciones para personalizar el estilo y contenido

### 🎬 Estudios de Animación
- Recreación y transformación de imágenes existentes
- Aplicación de diferentes estilos artísticos

### 🤖 Asistente Virtual
- Chat interactivo con un asistente basado en IA
- Persistencia de conversaciones mediante sistema de threads

## Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Routing**: React Router DOM v7
- **UI Components**: Radix UI, Lucide React (iconos)
- **Estilizado**: Tailwind CSS, class-variance-authority, clsx
- **Desarrollo**: Vite, ESLint
- **APIs**: Conexión a servicios de IA mediante API REST

## Arquitectura del Proyecto

El proyecto sigue una arquitectura limpia con separación clara de responsabilidades:

- **Core**: Contiene los casos de uso que interactúan con las APIs externas
- **Interfaces**: Define los tipos de datos y respuestas de las APIs
- **Presentation**: Implementa los componentes visuales y páginas de la aplicación
  - **Components**: Componentes reutilizables como burbujas de chat y cajas de mensajes
  - **Layouts**: Estructura base de la aplicación
  - **Pages**: Páginas individuales para cada funcionalidad
  - **Router**: Configuración de rutas de la aplicación

## Cómo Ejecutar el Proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la versión de producción
npm run preview
```

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno en un archivo `.env`:

```
VITE_GPT_API=URL_de_tu_API
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir los estándares de código del proyecto y crear pruebas para nuevas funcionalidades.
