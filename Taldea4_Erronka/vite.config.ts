import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            // 1. Sincronizamos con index.jsx (el archivo que Laravel espera)
            input: ['resources/css/app.css', 'resources/js/index.jsx'],
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        // 2. Asegura que el JSX se procese automáticamente
        jsx: 'automatic',
    },
    server: {
        // 3. Configuración para que Vite sea accesible desde fuera del contenedor
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
        },
    }
});