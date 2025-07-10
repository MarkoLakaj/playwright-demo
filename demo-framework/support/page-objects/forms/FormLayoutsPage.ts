import { Page, Locator } from "@playwright/test";

class FormLayoutsPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    getRadioOption(radioOption: string) {
        return this.page.getByRole('radio', {name: radioOption})
    }

    async enterEmail(email: string) {
        await this.page.locator('nb-card', {hasText: 'Using the Grid'}).getByPlaceholder('Email').fill(email)
    } 

    async enterPassword(password: string) {
        await this.page.locator('nb-card', {hasText: 'Using the Grid'}).getByPlaceholder('Password').fill(password)
    }

    async selectRadioOption(radioOption: string) {
        await this.page.getByRole('radio', {name: radioOption}).check({force: true}) // {force: true} is needed because the element is visually hidden in the DOM
    }

}

export default FormLayoutsPage;