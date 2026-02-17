import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Layout from './components/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Artetxea';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });
        let page = pages[`./pages/${name}.jsx`];
        
        if (!page) {
            throw new Error(`Page not found: ./pages/${name}.jsx`);
        }
        
        page.default.layout = page.default.layout || ((page) => <Layout>{page}</Layout>);
        
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