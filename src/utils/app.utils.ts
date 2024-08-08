import { randomUUID } from "crypto"

export class AppUtils {
    
    private constructor() {}

    static genereteUUIDSimples(){
        const uuid:string = randomUUID()
        const uuidToken = uuid.split('-')
        return uuidToken[uuidToken.length -1]
    }
}