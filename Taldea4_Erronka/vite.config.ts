import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            // CORRECCIÓN: 'App.jsx' con A mayúscula para que coincida con tu archivo
            input: ['resources/css/app.css', 'resources/js/App.jsx'],
            ssr: 'resources/js/ssr.jsx',
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
        jsx: 'automatic',
    },
    // Limpiamos la configuración de server para evitar conflictos en Docker
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
    }
});