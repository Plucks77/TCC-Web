import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  /* background: yellow; */
`;

export const Campos = styled.div`
  /* width: 100px;
  height: 100px; */
  /* background: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Titulo = styled.text`
  font-size: 60px;
  color: #36453b;
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
  font-size: 30px;
  color: #36453b;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 310px;
  height: 45px;
  border: 3px solid #818be7;
  border-radius: 10px;
  padding-left: 5px;
  font-size: 20px;
  color: #36453b;
`;

export const Botao = styled.button`
  width: 310px;
  height: 40px;
  border-radius: 10px;
  background: #818be7;
  border-color: #818be7;
  color: #eeeeee;
  font-size: 20px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
`;

export const Erro = styled.small`
  color: crimson;
  font-size: 16px;
`;
