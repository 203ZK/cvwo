import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          secure: false,
          changeOrigin: true
        }
      }
    },
    plugins: [react()]
  };
})
