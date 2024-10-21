import { AppUtils } from '../src/utils/app.utils'

describe('AppUtils_Sum', () => {
    test('deve somar os numeros', () => {
        const sumResult = AppUtils.sum(1, 2, 3)
        expect(sumResult).toBe(6)
    })

    test('deve retornar um erro quando for passado qualquer parametro com numero negativo', () => {
        expect(() => {
            AppUtils.sum(-1, 10)
        }).toThrow('nao pode negativo')
    })

    test('deve retornar um erro quando for passado qualquer parametro que nao seja um numero', () => {
        expect(() => {
            AppUtils.sum(true, 10)
        }).toThrow('so pode numeros')
    })
})

describe('AppUtils_Multiply', () => {
    test('deve multiplicar os numeros', () => {
        const multiplyResult = AppUtils.multiply(1, 2, 3)
        expect(multiplyResult).toBe(6)
    })

    test('deve retornar um erro quando for passado qualquer parametro com numero negativo', () => {
        expect(() => {
            AppUtils.multiply(-1, 10)
        }).toThrow('nao pode negativo')
    })

    test('deve retornar um erro quando for passado qualquer parametro que nao seja um numero', () => {
        expect(() => {
            AppUtils.multiply(true, 10)
        }).toThrow('so pode numeros')
    })

    describe('AppUtils_Average', () => {
        test('deve calcular a media dos numeros', () => {
            const averageResult = AppUtils.average(1, 2, 3)
            expect(averageResult).toBe(2)
        })
        
        test('deve retornar um erro quando for passado qualquer parametro que nao seja um numero', () => {
            expect(() => {
                AppUtils.average(true, 10)
            }).toThrow('so pode numeros')
        })    

        test('deve retornar um erro quando lista for vazia', () => {
            expect(() => {
                AppUtils.average()
            }).toThrow('lista nao pode estar vazia')
        })    
    })
})