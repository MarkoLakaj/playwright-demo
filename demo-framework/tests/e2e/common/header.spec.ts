import { test, expect } from "../../../support/fixtures/general-fixtures";


test('select a theme from theme menu and assert site background color change', async({header}) => {

    // Open up theme dropdown
    await header.clickThemeDropdown()
    // Select Corporate theme
    await header.selectThemeDropdown('Dark')
    // Assert that the site background color has changed to Dark
    await expect(header.getHeaderLayout()).toHaveCSS('background-color', 'rgb(34, 43, 69)')
})