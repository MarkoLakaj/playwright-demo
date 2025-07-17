import { Page } from "@playwright/test";

class PopoverPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickTemplatePopoverWithTabsButton() {
        await this.page.getByRole('button', {name: 'With tabs'}).first().click()
    }

    async selectTab(tabName: string) {
        await this.page.getByRole('listitem').getByText(tabName).click();
    }   

    async readTabMessage() {
        return await this.page.locator('[class="content-active"] div').textContent()
    }
    
}

export default PopoverPage;