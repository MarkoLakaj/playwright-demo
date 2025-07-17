import tags from '../test-data/tags.json'
import { test as base} from '@playwright/test'

const authFile = '.auth/user.json'

type ApiFixtures = {
    navigateToHomepage: void
    tokenSetup: void
    mockArticleTags: void
    mockArticleEntity: void
}

export const test = base.extend<ApiFixtures> ({

    navigateToHomepage: [
        async({page}, use) => {
            await page.goto(`${process.env.BASE_URL_BE}`)
            await use()
        },
      
        {
            auto: true
        }
    ],

    tokenSetup: 
        async ({ request }, use) => {
            const response = await request.post(process.env.ACCESS_TOKEN_BE as string, {
                data: {
                    "user": {
                        "email": `${process.env.LOGIN_EMAIL_BE}`,
                        "password": `${process.env.LOGIN_PASSWORD_BE}`
                    }
                }
            });
            
            // Save the storage state
            await request.storageState({ path: authFile });
            const responseBody = await response.json();
            process.env['ACCESS_TOKEN'] = responseBody.user.token;
            await use();
        }, 

    mockArticleTags: 
        async({page}, use) => {
            await page.route('*/**/api/tags', async route => {
                await route.fulfill({
                    body: JSON.stringify(tags)
                })
            })
            await use()
        },

    mockArticleEntity: 
        async({page}, use) => {
            await page.route('*/**/articles*', async route => {
                try {
                    const response = await route.fetch();
                    const responseBody = await response.json();
                    
                    // Verify the response structure before modifying
                    if (responseBody?.articles?.length > 0) {
                        responseBody.articles[0].title = 'This is the mocked title';
                        responseBody.articles[0].description = 'This is the mocked description';
                    } else {
                        console.warn('No articles found in response:', responseBody);
                        // Create mock articles if none exist
                        responseBody.articles = [{
                            title: 'This is the mocked title',
                            description: 'This is the mocked description',
                            // Add other required fields
                            slug: 'mock-article',
                            body: 'Mock content',
                            tagList: [],
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            favorited: false,
                            favoritesCount: 0,
                            author: {
                                username: 'mockuser',
                                bio: null,
                                image: null,
                                following: false
                            }
                        }];
                    }
                    
                    await route.fulfill({
                        body: JSON.stringify(responseBody)
                    });
                } catch (error) {
                    console.error('Mocking failed:', error);
                    // Fall back to original response
                    route.continue();
                }
            });
            
            await use()
        }



});

export { expect } from '@playwright/test'

