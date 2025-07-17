import { Page } from "@playwright/test";

class FeatureMenu {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Method for navigating to a feature inside of a feature section. Checks if feature section is already expanded
     * @param sectionTitle - this is a feature section title
     * @param featureTitle - this is a desired feature title
     */
    async navigateTo(sectionTitle: string, featureTitle: string) {
        const featureSectionItem = this.page.getByTitle(sectionTitle)
        const isExpanded = await featureSectionItem.getAttribute('aria-expanded')
        if (isExpanded === 'false') {
            await featureSectionItem.click()
        }
        await this.page.getByTitle(featureTitle).click();
    }
}

export default FeatureMenu;