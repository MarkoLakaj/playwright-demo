import {test , expect} from "../../../support/fixtures/general-fixtures";

const OPTION_2 = 'Option 2'
const OPTION_1 = 'Option 1'

test('should login and select "Option 2" radio button, verifying selection state', async({formLayoutsPage}) => {

    // Enter credentials
    await formLayoutsPage.enterEmail(process.env.LOGIN_EMAIL_FE as string)
    await formLayoutsPage.enterPassword(process.env.LOGIN_PASSWORD_FE as string)
    // Select radio option 2
    await formLayoutsPage.selectRadioOption(OPTION_2)
    // Assert option 2 has been checked 
    await expect(formLayoutsPage.getRadioOption(OPTION_2)).toBeChecked()
    // Assert option 1 has not been checked
    await expect (formLayoutsPage.getRadioOption(OPTION_1)).not.toBeChecked()

})
