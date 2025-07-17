import { test, expect } from "../../support/fixtures/api-fixtures"


test('mockLoadedArticlesOnHomepage', async({page, mockArticleEntity}) => {

        // Mock the article entity
        mockArticleEntity

        // Assert that the first article contains mocked title and description
        await expect(page.locator('app-article-list h1').first()).toContainText('This is the mocked title', {timeout: 10000})
        await expect(page.locator('app-article-list p').first()).toContainText('This is the mocked description',  {timeout: 10000})
})
