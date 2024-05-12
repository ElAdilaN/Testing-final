
import Calculadora from '../js/model';
import { calculate } from '../js/utils';
import puppeteer from 'puppeteer';

describe("Integration Test", () => {
    test('Suma 1 + 2', () => {
        const calc = new Calculadora();
        calc.set(1);
        calc.operator = '+';
        calc.set(2);
        expect(calc.operate()).toBe(3);
    });

    test('Resta 5 - 4', () => {
        const calc = new Calculadora();
        calc.set(5);
        calc.operator = '-';
        calc.set(4);
        expect(calc.operate()).toBe(1);
    });

    test('Multiplicació 10 * 2', () => {
        const calc = new Calculadora();
        calc.set(10);
        calc.operator = '*';
        calc.set(2);
        expect(calc.operate()).toBe(20);
    });

    test('Divisió 12 / 6', () => {
        const calc = new Calculadora();
        calc.set(12);
        calc.operator = '/';
        calc.set(6);
        expect(calc.operate()).toBe(2);
    });

    test('Operacio undefined', () => {
        const calc = new Calculadora();
        expect(() => {
            calc.set(undefined);
        }).toThrow(TypeError);
    });

    test('Operació sense 2n número', () => {
        const calc = new Calculadora();
        calc.set(1);
        calc.set(2);
        calc.operator = '+';
        expect(calc.operate()).toBe('Error');
    })

    test('Operació sense 1r número', () => {
        const calc = new Calculadora();
        calc.operator = '-';
        calc.set(8);
        expect(calc.operate()).toBe('Error');
    })

    test('Operació divisio per zero', () => {
        const calc = new Calculadora();
        calc.set(10);
        calc.operator = '/';
        calc.set(0);
        expect(calc.operate()).toBe(Infinity);
    })

    test('Operacio valor unic', () => {
        const calc = new Calculadora();
        calc.set(5);
        expect(calc.value1).toBe('5');
        expect(calc.value2).toBeUndefined();
        expect(calc.operator).toBeUndefined();
      });

    test('Operacio amb dos digits', () => {
        const calc = new Calculadora();
        calc.set(5);
        calc.set(3);
        calc.operator = '+';
        calc.set(2);
        expect(calc.value1).toBe('53');
        expect(calc.value2).toBe('2');
        expect(calc.operate()).toBe(55);
    });

    test('Operacio decimal', () => {
        const calc = new Calculadora();
        calc.set_point();
        calc.set(5);
        calc.operator = '+';
        calc.set_point();
        calc.set(3);
        expect(calc.operate()).toBe(0.8);
    });

    test('Operacio negativa decimal', () => {
        const calc = new Calculadora();
        calc.set(10);
        calc.set_point();
        calc.set(5);
        calc.operator = '-';
        calc.set(15);
        calc.set_point();
        calc.set(4)
        expect(calc.operate()).toBe(-4.9);
    });

    test('Clear', () => {
        const calc = new Calculadora();
        calc.set(5);
        calc.clear();
        expect(calc.value1).toBeUndefined();
    })

    test('Retorna només el primer valor', () => {
        const calc = new Calculadora();
        calc.set(1);
        expect(calc.operate()).toBe('1');
    })

    test('Retorna només el segon valor', () => {
        const calc = new Calculadora();
        calc.set(1);
        calc.set(2);
        expect(calc.operate()).toBe('12');
    })

    test('El segon valor i operador undefined', () => {
        const calc = new Calculadora();
        calc.set(5);
        const result = calc.operate();
        expect(result).toBe('5');
        expect(calc.value2).toBeUndefined();
        expect(calc.operator).toBeUndefined();
    })

    test('Mira si hi ha punt decimal en el valor 1', () => {
        const calc = new Calculadora();
        calc.set(1);
        calc.set_point();
        expect(calc.set_point()).toBe('1.');
    })

    test('Mira si hi ha punt decimal en el valor 2', () => {
        const calc = new Calculadora();
        calc.set(1);
        calc.operator = '+';
        calc.set(2);
        calc.set_point();
        expect(calc.set_point()).toBe('2.');
    })

    test('Operació sense operador', () => {
        const calc = new Calculadora();
        calc.value1 = "2";
        calc.value2 = "3";
        calc.operator = undefined;
        expect(calc.operate()).toBe(undefined);
        //Valor inesperat. Si no s'ha definit l'operador torna undefined.
    })

    test('End-to-End Test: Suma 1 + 2', async () => {
        let browser, page;
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 30,
            args: ['--window-size=1920,1080']
        });
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:5500/index.html');

        await page.click('#oneButton');
        await page.click('#plusButton');
        await page.click('#twoButton');
        await page.click('#equalButton');

        const result = calculate(1, 2, '+');
        expect(result).toBe(3);
    })
})
