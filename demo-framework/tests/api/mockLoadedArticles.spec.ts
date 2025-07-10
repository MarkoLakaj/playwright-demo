import { test, expect } from "../../support/fixtures/api-fixtures";

test('mockLoadedArticlesOnHomepage', async({page, mockArticleTags}) => {

    // Mock the article tags 
    mockArticleTags

    // Assert that the article box contains mocked titles
    await expect(page.locator('[class="tag-list"]')).toContainText("Mock", {timeout: 10000})
    await expect(page.locator('[class="tag-list"]')).toContainText("Automation", {timeout: 10000} )
    await expect(page.locator('[class="tag-list"]')).toContainText("Test", {timeout: 10000})
})
