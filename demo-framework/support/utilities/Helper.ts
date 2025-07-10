import { Page } from "@playwright/test";
import validator from 'validator'

class Helper {

    private readonly page: Page

    constructor (page: Page) {
        this.page = page;
    }


    // Email validator
    static isEmailValid(email: string): boolean {
          return validator.isEmail(email) && email.length <= 50;
    }

}

export default Helper;