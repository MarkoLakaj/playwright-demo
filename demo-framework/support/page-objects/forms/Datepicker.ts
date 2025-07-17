import { Page } from "@playwright/test";


class Datepicker {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async openCommonDatepicker(): Promise<void> {
        await this.page.getByPlaceholder('Form Picker').click()
    }

    async selectCurrentMonthDate(dayOfCurrentMonth: string): Promise<void> {
        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(dayOfCurrentMonth, {exact: true}).click()
    }

    getCommonDatePicker() {
        return this.page.getByPlaceholder('Form Picker')
    }

    async getCalendarMonthAndDate() {
        return await this.page.locator('nb-calendar-view-mode').textContent()
    }

    async iterateThroughCalendar(): Promise<void> {
        await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    }

}

export default Datepicker;