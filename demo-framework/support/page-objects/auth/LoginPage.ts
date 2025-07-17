import { Locator, Page } from "@playwright/test"

class LoginPage {

    private readonly page: Page
   
    constructor (page: Page) {
        this.page = page
    }

    get loginButton(): Locator {
    return this.page.getByRole('button', { name: ' Log In ' });
    }

    async enterEmailAddress(emailAddress: string): Promise<void> {
        await this.page.locator('#input-email').fill(emailAddress)
    }

    async clearEmailAddress(): Promise<void> {
        await this.page.locator('#input-email').clear()
    }

    async getEmailValidationStatus(): Promise<string> {
        const status = await this.page.locator('#input-email').getAttribute('ng-reflect-status')
        return status ?? ""
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.locator('#input-password').fill(password)
    }

    async clearPassword(): Promise<void> {
        await this.page.locator('#input-password').clear()
    }

    async clickLoginButton(): Promise<void> {
        await this.page.getByRole("button", {name: ' Log In '}).click({force: true})
    }

    async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.enterEmailAddress(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

export default LoginPage;