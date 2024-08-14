import devEnvironment from "./dev.environments"
import prdEnvironment from "./prd.environments"

export default (() => {
    const env = process.env.APP_ENV
    
    if (!env) throw new Error('APP_ENV is not defined. You must provide a APP_ENV valid. (dev, prd)')        
    
    switch (env) {
        case ('dev'): return devEnvironment
        case ('prd'): return prdEnvironment
        default: throw new Error(`APP_ENV is not valid. ===> ${env} <===`)
    }
})()