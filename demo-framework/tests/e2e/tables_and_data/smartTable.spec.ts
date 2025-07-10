import {test , expect} from "../../../support/fixtures/general-fixtures";


test('select user from the table and edit it', async({smartTablePage}) => {

    const specificUserEmail = 'twitter@outlook.com'
    const specificUserAgeEdited = '30'

    // click Edit button for a specific user based on email
    await smartTablePage.editSpecificUserAge(specificUserEmail, specificUserAgeEdited)
    // assert that user age has been correctly edited
    const ageText = await smartTablePage.readSpecificUserAge(specificUserEmail);
    expect(ageText).toEqual(specificUserAgeEdited);

})

test('filter user age and assert correct values', async({page, smartTablePage}) => {

    const userAge = ['20', '30', '40', '200']
    
    //Filter user by age
    for (let age of userAge) {

        await smartTablePage.filterUserByAge(age)
        const tableRows = page.locator('tbody tr')
        for (let row of await tableRows.all()) {
            const ageCellValue = await row.locator('td').last().textContent()
            if (age == '200') {
                expect(await page.locator('tbody').textContent()).toContain('No data found')
            } else {
                expect(ageCellValue).toEqual(age)
            }
        }
    }

})