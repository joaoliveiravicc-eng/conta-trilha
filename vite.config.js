import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: { port: 5173 },
  plugins: [
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'ContaTrilha — Contabilidade do zero',
        short_name: 'ContaTrilha',
        description: 'Aprenda contabilidade do zero, no ritmo de um jogo: trilhas, exercícios e revisão automática dos seus erros.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#F4F8F1',
        theme_color: '#58CC02',
        prefer_related_applications: false,
        categories: ['education', 'productivity'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // App shell (HTML/CSS/JS) fica cacheado para abrir offline; o progresso do
        // aluno mora em localStorage/Supabase, não neste cache.
        globPatterns: ['**/*.{js,css,html,png,svg,webp,woff2,json,webmanifest}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 12, maxAgeSeconds: 31536000 } },
          },
        ],
      },
    }),
  ],
});
