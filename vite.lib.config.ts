import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components/IdeaWidget'],
      outDir: 'lib',
    }),
  ],
  build: {
    lib: {
      entry: 'src/components/IdeaWidget/index.ts',
      name: 'IdeaWidget',
      fileName: 'idea-widget',
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    outDir: 'lib',
  },
})
