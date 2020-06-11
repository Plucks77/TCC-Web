import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  background: #eeeeeeee;
`;

export const Main = styled.div`
  background: rgb(129, 139, 231, 0.3);
  display: flex;
  flex-direction: column;
  height: 500px;
  min-width: 700px;
  margin: 5em 5em;
  border-radius: 20px;
`;

export const FileiraCampos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FileiraDescricao = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 800px;
`;

export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

export const CampoDescricao = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 5em 1em 5em;
  width: 100%;
  min-width: 640px;
`;

export const Titulo = styled.text`
  font-size: 30px;
  color: #36453b;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 15em;
  height: 30px;
  border: 3px solid #818be7;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 20px;
  color: #36453b;
`;

export const InputDescricao = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 10em;
  border: 3px solid #818be7;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 20px;
  color: #36453b;
`;

export const BotoesContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: auto;
  margin-right: 5em;
`;

export const Botao = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 20px;
  border-width: 0;
  color: #eeeeeeee;
  font-size: 25px;
  margin: 0 0 0 2em;
  cursor: pointer;
`;
