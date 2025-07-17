import { faker } from '@faker-js/faker';
import Helper from "../../../support/utilities/Helper";
import { test, expect } from '../../../support/fixtures/general-fixtures'

   
test('should successfully login with valid credentials', async({page, loginPage}) => {

    // Enter valid credentials and click Login Button
    await loginPage.loginWithCredentials(process.env.LOGIN_EMAIL_FE as string, process.env.LOGIN_PASSWORD_FE as string)
    // Assert the user lands on home page
    await page.waitForURL('**/pages/iot-dashboard')
    await expect(page).toHaveURL(/pages\/iot-dashboard/)
})

test('login button should be disabled if either credentials are missing', async({page, loginPage}) => {

    // Check if the login button is initially disabled
    await expect(loginPage.loginButton).toBeDisabled()

    // Try to login without entering any credentials
    await loginPage.enterEmailAddress(process.env.LOGIN_EMAIL_FE as string)
    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.clearEmailAddress()
    await loginPage.enterPassword(process.env.LOGIN_PASSWORD_FE as string)
    await expect(loginPage.loginButton).toBeDisabled()
})

/**
 * This test fails due to the production issue
 * Issue: API accepts the email length outside of the specification, emails
 * containing more than 50 characters and containing white space should be invalid
 */
test.skip('should validate the email field', async({page, loginPage}) => {

    test.info().annotations.push({ type: 'known-issue', description: 'API does not enforce email constraints' })

    const validationCases = [
        faker.internet.email(),                             // Valid email
        'missing@domain',                                   // Invalid (no TLD)
        'missing_at.com',                                   // Invalid (no @)
        faker.internet.email({provider: 'comma,com'}),      // Invalid chars
        `${faker.lorem.words(50)}@test.com`                 // Too long
    ]

    for (const email of validationCases) {

        await loginPage.clearEmailAddress()
        await loginPage.clearPassword()
        await loginPage.enterEmailAddress(email)
        await loginPage.enterPassword(process.env.LOGIN_PASSWORD_FE as string)

        if (Helper.isEmailValid(email)) {
            expect(page.locator('#input-email')).toHaveClass(/status-success/)
        } else {
            expect(page.locator('#input-email')).toHaveClass(/status-danger/)
        }
    }
})

/**
 * This test fails due to the production issue
 * Issue: API accepts the password length outside of the specification, passwords
 * containing more than 50 characters should be invalid
 */
test.skip('should validate the password field', async({page, loginPage}) => {

    // Validate the password must be between 4 and 50 characters long
    await loginPage.loginWithCredentials(process.env.LOGIN_EMAIL_FE as string, process.env.LOGIN_PASSWORD_FE as string)
    await expect( page.getByText(' Password should contain from 4 to 50 characters ')).toBeVisible()
    await loginPage.clearPassword()
    await loginPage.enterPassword(faker.string.alphanumeric(51))
    await loginPage.clickLoginButton() 
    await expect( page.getByText(' Password should contain from 4 to 50 characters ')).toBeVisible()
})
