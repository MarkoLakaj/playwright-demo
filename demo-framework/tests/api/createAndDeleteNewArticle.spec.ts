import { test, expect } from "../../support/fixtures/api-fixtures";
import article from '../../support/test-data/article.json'

test.skip('Create and then delete the new article using API', async({request, tokenSetup}) => {

    tokenSetup

    // Create new article
    const articleResponse = await request.post(`${process.env.CREATE_ARTICLE_BE}`, {
        data: article
    })
    expect(articleResponse.status()).toEqual(201)

    const articleResponseBody = await articleResponse.json()
    const articleSlugId = articleResponseBody.article.slug

    // Delete the article
    const deleteArticleResponse = await request.delete(`${process.env.CREATE_ARTICLE_BE}${articleSlugId}`)
    expect(deleteArticleResponse.status()).toEqual(204)
})
