import { Locator, Page } from "@playwright/test";

class SmartTablePage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    private ageFilterInput(): Locator {
        return this.page.getByRole('row').getByPlaceholder('Age');
    }

    private specificAgeFilterInput(): Locator {
        return this.page.locator('input-editor').getByPlaceholder('Age')
    }

    async clickSpecificUserEditButton(userEmail: string) {
        await this.page.getByRole('row', {name: userEmail}).locator('.nb-edit').click()
    }

    async filterUserByAge(userAge: string) {
        await this.ageFilterInput().click()
        await this.ageFilterInput().clear()
        await this.ageFilterInput().fill(userAge)
        // The wait here is only to ensure the animation compactness after the search
        await this.page.waitForTimeout(500)
    }

    async editSpecificUserAge(userEmail: string, userAgeEdit: string) {
        await this.clickSpecificUserEditButton(userEmail)
        await this.specificAgeFilterInput().clear()
        await this.specificAgeFilterInput().fill(userAgeEdit)
        await this.page.locator('.nb-checkmark').click()
    }

    async readSpecificUserAge(userEmail: string) {
         return await this.page.getByRole('row', {name: userEmail}).locator('.ng-star-inserted').last().textContent()
    }

}

export default SmartTablePage;