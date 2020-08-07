import styled from "styled-components";
import { Admin } from "../../utils/helpers/colors";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${Admin.background};
`;

export const LoaderContainer = styled.div`
  align-self: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: ${Admin.background};
`;

export const Titulo = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: ${Admin.text};
`;

export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${Admin.text};
  margin-bottom: 3px;
  margin-left: 5px;
`;

export const Input = styled.input`
  width: 350px;
  height: 30px;
  border: 3px solid ${Admin.main};
  border-radius: 10px;
  padding-left: 10px;
  font-size: 20px;
  color: ${Admin.text};
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const IconeContainer = styled.div`
  margin-left: -2em;
  cursor: pointer;
`;

export const Botao = styled.button`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background: ${Admin.main};
  border-color: ${Admin.main};
  color: ${Admin.background};
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  margin-top: 2em;
  align-self: center;
`;

export const Erro = styled.small`
  color: ${Admin.erro};
  font-size: 16px;
  align-self: center;
  margin-top: 1px;
`;

export const FormErro = styled.small`
  color: ${Admin.background};
  font-size: 20px;
  align-self: center;
  margin-top: 1px;
`;
