import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const LoaderContainer = styled.div`
  align-self: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`;

export const Titulo = styled.text`
  font-size: 32px;
  font-weight: bold;
  color: #36453b;
`;

export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #36453b;
  margin-bottom: 3px;
  margin-left: 5px;
`;

export const Input = styled.input`
  width: 350px;
  height: 30px;
  border: 3px solid #818be7;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 20px;
  color: #36453b;
`;

export const Botao = styled.button`
  width: 350px;
  height: 40px;
  border-radius: 10px;
  background: #818be7;
  border-color: #818be7;
  color: #eeeeee;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  margin-top: 2em;
  align-self: center;
`;

export const Erro = styled.small`
  color: crimson;
  font-size: 16px;
  align-self: center;
  margin-top: 1px;
`;

export const FormErro = styled.small`
  color: crimson;
  font-size: 20px;
  align-self: center;
  margin-top: 1px;
`;
