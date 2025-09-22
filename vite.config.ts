mport { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // This makes the environment variable available in the client-side code
    // as process.env.API_KEY, which is required by the Gemini SDK.
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
