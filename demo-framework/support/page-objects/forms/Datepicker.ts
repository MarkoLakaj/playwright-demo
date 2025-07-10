import { Locator, Page } from "@playwright/test";


class Datepicker {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async openCommonDatepicker() {
        await this.page.getByPlaceholder('Form Picker').click()
    }

    async selectCurrentMonthDate(date: string) {
        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(date, {exact: true}).click()
    }

    getCommonDatePicker() {
        return this.page.getByPlaceholder('Form Picker')
    }

    async getCalendarMonthAndDate() {
        return await this.page.locator('nb-calendar-view-mode').textContent()
    }

    async iterateThroughCalendar() {
        await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    }

}

export default Datepicker;