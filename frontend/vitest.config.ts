/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        exclude: ['**/tests/e2e/**', 'node_modules/**', 'dist/**', '.{idea,git,cache,output,temp}/**'],
        setupFiles: './src/test/setup.ts',
        coverage: {


            provider: 'v8',
            exclude: ['src/test/**', 'postcss.config.js', 'tailwind.config.js'],
            thresholds: {
                lines: 85,
                branches: 75
            }
        },
    },
})
