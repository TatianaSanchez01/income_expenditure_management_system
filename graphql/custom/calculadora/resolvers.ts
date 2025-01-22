const CalculadoraResolvers = {
  Query: {
    calculadora: async (_: any, args: any) => {
      const { opracion, num1, num2 } = args;
      let resultado = 0;
      switch (opracion) {
        case 'suma':
          resultado = num1 + num2;
          break;
        case 'resta':
          resultado = num1 - num2;
          break;
        case 'multiplicacion':
          resultado = num1 * num2;
          break;
        case 'division':
          resultado = num1 / num2;
          break;
        default:
          resultado = 0;
          break;
      }
      return { resultado };
    },
  },
};

export { CalculadoraResolvers };
