import { Locator, Page } from "@playwright/test";

class PopoverPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickTemplatePopoverWithTabsButton() {
        await this.page.getByRole('button', {name: 'With tabs'}).first().click()
    }

    async clickWhatsUpTab() {
        await this.page.getByRole('listitem').getByText("What's up?").click()
    }

    async clickSecondTab() {
        await this.page.getByRole('listitem').getByText("Second tab").click()
    }

    async readTabMessage() {
        return await this.page.locator('[class="content-active"] div').textContent()
    }







}

export default PopoverPage;