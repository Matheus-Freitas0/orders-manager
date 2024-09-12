export class Paged<T> {

    constructor (private page: number, private content: T[], private totalItems: number) {}

}