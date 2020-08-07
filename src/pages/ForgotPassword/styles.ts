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

export const Campos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Titulo = styled.h1`
  font-size: 32px;
  color: ${Admin.text};
  text-align: center;
`;

export const DivCampo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 24px;
  color: ${Admin.text};
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.input`
  width: 310px;
  height: 45px;
  border: 3px solid #818be7;
  border-radius: 10px;
  padding-left: 5px;
  font-size: 20px;
  color: ${Admin.text};
`;

export const IconeContainer = styled.div`
  margin-left: -2em;
  cursor: pointer;
`;

export const Botao = styled.button`
  width: 310px;
  height: 40px;
  border-radius: 10px;
  background: ${Admin.main};
  border-color: ${Admin.main};
  color: ${Admin.background};
  font-size: 24px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
`;

export const Erro = styled.small`
  color: ${Admin.danger};
  font-size: 16px;
`;
