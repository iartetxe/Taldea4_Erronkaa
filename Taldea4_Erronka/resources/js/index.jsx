import './bootstrap'; // Si borraste este archivo antes, comenta esta línea
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Layout from './components/layout'; // Asegúrate de que esta ruta es correcta

const appName = import.meta.env.VITE_APP_NAME || 'Artetxea';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    
    // ESTA ES LA PARTE CORREGIDA (Mucho más segura)
    resolve: (name) => {
        // Usamos la función oficial para buscar la página
        const page = resolvePageComponent(
            `./pages/${name}.jsx`, 
            import.meta.glob('./pages/**/*.jsx')
        );

        // Le añadimos el Layout automáticamente cuando la encuentre
        page.then((module) => {
            module.default.layout = module.default.layout || (page => <Layout children={page} />);
        });

        return page;
    },
    
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#d4af37',
        showSpinner: true,
    },
});