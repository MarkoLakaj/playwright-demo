import { Page } from "@playwright/test";

class FeatureMenu {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Method for navigating to a feature inside of a feature section. Checks if feature section is already expanded
     * @param featureSection - this is a feature section
     * @param featureName - this is a desired feature
     */
    async navigateTo(featureSection: string, featureName: string) {
        const featureSectionItem = this.page.getByTitle(featureSection)
        const expandedState = await featureSectionItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await featureSectionItem.click()
        }
        await this.page.getByTitle(featureName).click();
    }
}

export default FeatureMenu;