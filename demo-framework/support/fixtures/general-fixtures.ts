// import {test as base} from './global-before-each';
import {test as base} from '@playwright/test';
import LoginPage from '../page-objects/auth/LoginPage';
import FeatureMenu from '../page-objects/common/FeatureMenu';
import Header from '../page-objects/common/Header';
import Datepicker from '../page-objects/forms/Datepicker';
import FormLayoutsPage from '../page-objects/forms/FormLayoutsPage';
import PopoverPage from '../page-objects/modal_and_overlays/PopoverPage';
import SmartTablePage from '../page-objects/tables_and_data/SmartTablePage';

type Fixtures = {
    
    beforeEach: void
    smartTablePage: SmartTablePage
    popoverPage: PopoverPage
    formLayoutsPage: FormLayoutsPage
    datePickerPage: Datepicker
    header: Header
    loginPage: LoginPage
    featureMenu: FeatureMenu
    
}

/**
 * Extended test instance with Login-specific fixtures
 * 
 * Builds upon the global fixtures (including automatic base URL navigation)
 * and navigates to the Auth -> Login page
 */
export const test = base.extend<Fixtures>({

    beforeEach: [
    async ({ page }, use) => {
      // Navigate to the base URL from environment variables
      await page.goto(process.env.BASE_URL_FE as string);
      // Yield control to the test execution
      await use();
    }, 
    { auto: true } // Auto-execute before each test that uses this fixture
  ],

    featureMenu: async({page}, use) => {
        const featureMenu = new FeatureMenu(page)
        await use(featureMenu)
    },
   
    loginPage: async ({ page, featureMenu }, use) => {
        // Initialize FeatureMenu and LoginPage
        const loginPage = new LoginPage(page);
        // Navigate to Login page via the application's menu system
        await featureMenu.navigateTo('Auth', 'Login');
        // Provide the configured LoginPage to the test
        await use(loginPage);
    },

    header: async({page}, use) => {
         // Initialize Header
        const header = new Header(page)
        // Provide the configured Header to the test
        await use(header);
    },

    datePickerPage: async({page, featureMenu}, use) => {
        // Initialize Datepicker
        const datePicker = new Datepicker(page);
        // Navigate to Login page via the application's menu system
        await featureMenu.navigateTo('Forms', 'Datepicker');
        // Provide the configured LoginPage to the test
        await use(datePicker);
    },

    formLayoutsPage: async({page, featureMenu}, use) => {
        // Initialize FormLayouts
        const formLayoutsPage = new FormLayoutsPage(page);
        // Navigate to Form Layouts page via the application's menu system
        await featureMenu.navigateTo('Forms', 'Form Layouts');
        // Provide the configured FormLayoutsPage to the test
        await use(formLayoutsPage);
    },

    popoverPage: async({page, featureMenu}, use) => {
        // Initialize Popover page
        const popoverPage = new PopoverPage(page);
        // Navigate to Popover page via the application's menu system
        await featureMenu.navigateTo('Modal & Overlays', 'Popover');
        // Provide the configured FormLayoutsPage to the test
        await use(popoverPage);
    },

    smartTablePage: async({page, featureMenu}, use) => {
        // Initialize Smart Table page
        const smartTablePage = new SmartTablePage(page);
        // Navigate to Popover page via the application's menu system
        await featureMenu.navigateTo('Tables & Data', 'Smart Table');
        // Provide the configured FormLayoutsPage to the test
        await use(smartTablePage);
    }

});

export { expect } from '@playwright/test';