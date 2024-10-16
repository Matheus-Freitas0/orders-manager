import { randomUUID } from "crypto"

export class AppUtils {
    
    private constructor() {}

    static genereteUUIDSimples(){
        const uuid:string = randomUUID()
        const uuidToken = uuid.split('-')
        return uuidToken[uuidToken.length -1]
    }

    static sleep = (time: number = 1000): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, time);
        })
    }

}