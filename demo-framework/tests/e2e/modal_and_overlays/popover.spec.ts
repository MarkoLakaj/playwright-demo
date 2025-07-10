import {test , expect} from "../../../support/fixtures/general-fixtures";


test("Template popover with tabs", async({popoverPage}) => {

    // Click Template Popovers -> WITH TABS
    await popoverPage.clickTemplatePopoverWithTabsButton()
    // Click on the second tab and assert tab message
    await popoverPage.clickSecondTab()
    expect(await popoverPage.readTabMessage()).toContain('Indeed!')
    // Click back on the first tab and assert tab message 
    await popoverPage.clickWhatsUpTab()
    expect(await popoverPage.readTabMessage()).toContain('Such a wonderful day!')
})