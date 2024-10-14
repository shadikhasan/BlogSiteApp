import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true, // This will show overlay errors in the browser
      timeout: 10000, // Increase timeout duration
    },
  },
});
