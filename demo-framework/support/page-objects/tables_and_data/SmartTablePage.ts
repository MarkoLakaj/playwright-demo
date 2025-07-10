import { Page, Locator } from "@playwright/test";

class SmartTablePage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickSpecificUserEditButton(userEmail: string) {
        await this.page.getByRole('row', {name: userEmail}).locator('.nb-edit').click()
    }

    async filterUserByAge(userAge: string) {
        await this.page.getByRole('row').getByPlaceholder('Age').click()
        await this.page.getByRole('row').getByPlaceholder('Age').clear()
        await this.page.getByRole('row').getByPlaceholder('Age').fill(userAge)
        // The wait here is only to ensure the animation compactness after the search
        await this.page.waitForTimeout(500)
    }

    async editSpecificUserAge(userEmail: string, userAgeEdit: string) {
        await this.clickSpecificUserEditButton(userEmail)
        await this.page.locator('input-editor').getByPlaceholder('Age').clear()
        await this.page.locator('input-editor').getByPlaceholder('Age').fill(userAgeEdit)
        await this.page.locator('.nb-checkmark').click()
    }

    async readSpecificUserAge(userEmail: string) {
         return await this.page.getByRole('row', {name: userEmail}).locator('.ng-star-inserted').last().textContent()
    }

}

export default SmartTablePage;