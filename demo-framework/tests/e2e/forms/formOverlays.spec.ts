import {test , expect} from "../../../support/fixtures/general-fixtures";
import FormLayoutsPage from "../../../support/page-objects/forms/FormLayoutsPage";

const radioOptionSelected = 'Option 2'

test('enter credentials, select option 2 and assert it has been selected', async({formLayoutsPage}) => {

    // Enter credentials
    await formLayoutsPage.enterEmail(process.env.LOGIN_EMAIL_FE as string)
    await formLayoutsPage.enterPassword(process.env.LOGIN_PASSWORD_FE as string)
    // Select radio option 2
    await formLayoutsPage.selectRadioOption(radioOptionSelected)
    // Assert option 2 has been checked 
    await expect(formLayoutsPage.getRadioOption(radioOptionSelected)).toBeChecked()
    // Assert option 1 has not been checked
    await expect (formLayoutsPage.getRadioOption('Option 1')).not.toBeChecked()

})
