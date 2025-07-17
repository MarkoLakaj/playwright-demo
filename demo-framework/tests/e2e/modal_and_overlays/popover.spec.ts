import {test , expect} from "../../../support/fixtures/general-fixtures";


test("Template popover with tabs", async({popoverPage}) => {

    // Click Template Popovers -> WITH TABS
    await popoverPage.clickTemplatePopoverWithTabsButton()
    // Click on the second tab and assert tab message
    await popoverPage.selectTab("Second tab")
    await expect(popoverPage.readTabMessage()).resolves.toContain('Indeed!');
    // Click back on the first tab and assert tab message 
    await popoverPage.selectTab("What's up?")
    expect(await popoverPage.readTabMessage()).toContain('Such a wonderful day!')
})