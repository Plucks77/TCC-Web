import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  background: #eeeeee;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 100px;
  align-items: center;
  margin-top: 2em;
`;

export const MenuSelecionado = styled.div`
  background: #818be7;
  color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 80px;
  border-radius: 10px;
  font-size: 30px;
  margin: 0 2em;
`;

export const MenuNaoSelecionado = styled.div`
  background: #eeeeeeee;
  color: #36453b;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 80px;
  border-radius: 10px;
  font-size: 30px;
  margin: 0 2em;
  cursor: pointer;
`;

export const Logout = styled.div`
  cursor: pointer;
`;

export const Tabela = styled.div`
  width: 90%;
  background: rgb(129, 139, 231, 0.3);
  margin-top: 1em;
  margin-bottom: 2em;
  padding-bottom: 1em;
  border-radius: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const TabelaContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

export const TabelaTitulo = styled.text`
  font-size: 20px;
  color: #36453b;
  font-weight: 500;
  margin: 0 2em;
`;

export const PacoteContainer = styled.div`
  background: #818be7;
  width: 90%;
  height: 3em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 1em;
`;

export const PacoteTexto = styled.div`
  margin: 0 2em;
  font-size: 20px;
  color: #eeeeeeee;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Circulo = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;