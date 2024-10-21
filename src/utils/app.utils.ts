import { randomUUID } from "crypto";

export class AppUtils {
  private constructor() {}

  static genereteUUIDSimples() {
    const uuid: string = randomUUID();
    const uuidToken = uuid.split("-");
    return uuidToken[uuidToken.length - 1];
  }

  static sleep = (time: number = 1000): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  static sum(...numbers: any[]): number {
    const hasNegative = numbers.some((item) => item < 0);
    if (hasNegative) throw new Error("nao pode negativo");

    const justNumbers = numbers.every((item) => typeof item === "number");
    if (!justNumbers) throw new Error("so pode numeros");
    
    return numbers.reduce((prev, current) => {
      return prev + current;
    }, 0);
  }

  static multiply(...numbers: any[]): number {
    const hasNegative = numbers.some((item) => item < 0);
    if (hasNegative) throw new Error("nao pode negativo");

    const justNumbers = numbers.every((item) => typeof item === "number");
    if (!justNumbers) throw new Error("so pode numeros");

    return numbers.reduce((prev, current) => {
      return prev * current;
    }, 1);
  }
  
  static average(...numbers: any[]): number {
    if (numbers.length === 0) throw new Error("lista nao pode estar vazia");

    const justNumbers = numbers.every((item) => typeof item === "number");
    if (!justNumbers) throw new Error("so pode numeros");

    const total = numbers.reduce((prev, current) => {
      return prev + current;
    }, 0);

    return total / numbers.length;
  }

}
