import { test, expect } from "../../../support/fixtures/general-fixtures";


test('select a theme from theme menu and assert site background color change', async({header}) => {

    const themeToColor = {
        Dark: 'rgb(34, 43, 69)',
        Cosmic: 'rgb(50, 50, 89)'
    };

    const themeDark = 'Dark';
    const themeCosmic = 'Cosmic'

    // Open up theme dropdown
    await header.clickThemeDropdown()
    // Select Dark theme
    await header.selectThemeDropdown(themeDark)
    // Assert that the site background color has changed to Dark
    await expect(header.getHeaderLayout()).toHaveCSS('background-color', themeToColor[themeDark])
    // Switch to Cosmic theme
    await header.clickThemeDropdown()
    await header.selectThemeDropdown(themeCosmic)
    // Assert that the site background color has changed to Cosmic
    await expect(header.getHeaderLayout()).toHaveCSS('background-color', themeToColor[themeCosmic])

})