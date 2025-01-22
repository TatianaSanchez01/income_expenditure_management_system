import { gql } from 'apollo-server-micro';

const CustomCalculadoraTypes = gql`
  type Calculadora {
    resultado: Float
  }
  type Query {
    calculadora(opracion: String, num1: Float, num2: Float): Calculadora
  }
`;

export { CustomCalculadoraTypes };