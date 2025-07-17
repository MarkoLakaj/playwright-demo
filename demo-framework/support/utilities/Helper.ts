import validator from 'validator'

class Helper {

    // Email validator
    static isEmailValid(email: string): boolean {
        return validator.isEmail(email) && email.length <= 50;
    }

    static formatDateForInput(date: Date): string {
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    static formatMonthYear(date: Date): string {
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return ` ${month} ${year} `;
    }
    
}

export default Helper;