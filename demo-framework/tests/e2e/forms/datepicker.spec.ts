import { test, expect } from "../../../support/fixtures/general-fixtures";
import Helper from "../../../support/utilities/Helper";


test('select date and assert correct date has been selected', async({datePickerPage}) => {

    const daysInFuture = 14

    let date = new Date()

    date.setDate(date.getDate() + daysInFuture)
    // Desired day number as string
    const desiredDate = date.getDate().toString()
    const expectedFullDate = Helper.formatDateForInput(date)
    // Open the Common Datepicker 
    await datePickerPage.openCommonDatepicker()
    let calendarMonthAndYear = await datePickerPage.getCalendarMonthAndDate()
    const expectedCalendarMonthAndYear = Helper.formatMonthYear(date)
    // Iterate through the calendar until the correct month / year is found
    while(!calendarMonthAndYear?.includes(expectedCalendarMonthAndYear)) {
        await datePickerPage.iterateThroughCalendar()
        calendarMonthAndYear = await datePickerPage.getCalendarMonthAndDate()
    }
    // Select the desired date within the current month
    await datePickerPage.selectCurrentMonthDate(desiredDate)
    // Assert the correct date value has been selected
    await expect(datePickerPage.getCommonDatePicker()).toHaveValue(expectedFullDate)
})
