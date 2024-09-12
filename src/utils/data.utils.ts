export class DateUtils {

    private constructor () {}

    static getCurrentDate(): string {
        const now  = new Date()
        let month: string | number = now.getMonth() + 1
        if (month < 10) month = `0${month}`
        return `${now.getFullYear()}-${month}-${now.getUTCDate()} 23:59:59`
    }

}