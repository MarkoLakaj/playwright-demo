import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }
  },

  projects: [
   
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  webServer: {
  command: process.env.CI 
    ? 'npm run start -- --port 4200 --host 0.0.0.0'
    : 'npm start',
  cwd: '../pw-practice-app',
  url: 'http://localhost:4200',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000
}
});
