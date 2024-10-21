import { AppUtils } from '../src/utils/app.utils'

describe('AppUtils', () => {
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