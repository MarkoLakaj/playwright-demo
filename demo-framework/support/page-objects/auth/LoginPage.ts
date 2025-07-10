import { Locator, Page } from "@playwright/test"

class LoginPage {

    private readonly page: Page
   
    constructor (page: Page) {
        this.page = page
    }

    async enterEmailAddress(emailAddress) {
        await this.page.locator('#input-email').fill(emailAddress)
    }

    async clearEmailAddress() {
        await this.page.locator('#input-email').clear()
    }

    async getEmailValidationStatus() {
        const status = await this.page.locator('#input-email').getAttribute('ng-reflect-status')
        return status as string
    }

    async enterPassword(password: string) {
        await this.page.locator('#input-password').fill(password)
    }

    async clearPassword() {
        await this.page.locator('#input-password').clear()
    }

    async clickLoginButton() {
        await this.page.getByRole("button", {name: ' Log In '}).click({force: true})
    }
}

export default LoginPage;