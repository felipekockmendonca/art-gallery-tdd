import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./test/setup.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'json'],
            include: ['src/**/*.js'],
            exclude: [
                '**/node_modules/**',
                '**/test/**',
                '**/__tests__/**',
                '**/*.test.js',
                '**/*.spec.js',
                'src/config/**',
                'src/middlewares/**',
                'src/server.js',
                'src/app.js',
                'src/modules/admin',
                'src/modules/artwork',
                'src/modules/category',
                'src/modules/interaction'
            ],
            thresholds: {
                statements: 80,
                branches: 80,
                functions: 80,
                lines: 80
            }
        }
    }
});