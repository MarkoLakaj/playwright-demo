import { Locator, Page } from "@playwright/test";

class Header {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    getHeaderLayout() {
        return this.page.locator('nb-layout-header')
    }

    async clickThemeDropdown() {
        await this.page.locator('ngx-header nb-select').click()
    }

    async selectThemeDropdown(theme: string) {
        await this.page.locator('nb-option-list nb-option').filter({hasText: theme}).click()
    }

}

export default Header;