import { test, expect } from "../../../support/fixtures/general-fixtures";


test('select date and assert correct date has been selected', async({datePickerPage}) => {

    const daysInFuture = 14

    let date = new Date()

    date.setDate(date.getDate() + daysInFuture)
    // Define desired date
    const desiredDate = date.getDate().toString()
    // Define expected date day, month, year
    const expectedDate = date.getDate().toString()
    const expectedMonth = date.toLocaleString('En-US', {month: "short"})
    const expectedYear = date.getFullYear().toString()
    const expectedFullDate = `${expectedMonth} ${expectedDate}, ${expectedYear}`
    // Open the Common Datepicker 
    await datePickerPage.openCommonDatepicker()
    // Define a calendar month and year for iteration logic
    let calendarMonthAndYEar = await datePickerPage.getCalendarMonthAndDate()
    // Define a calendar month and year that is expected
    const expectedMonthLong = date.toLocaleString('En-US', {month: "long"})
    const expectedCalendatMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    // Iterate through the calendar until the correct month / year is found
    while(!calendarMonthAndYEar?.includes(expectedCalendatMonthAndYear)) {
        await datePickerPage.iterateThroughCalendar()
        calendarMonthAndYEar = await datePickerPage.getCalendarMonthAndDate()
    }
    // Select the desired date within the current month
    await datePickerPage.selectCurrentMonthDate(desiredDate)
    // Assert the correct date value has been selected
    await expect(datePickerPage.getCommonDatePicker()).toHaveValue(expectedFullDate)
})
