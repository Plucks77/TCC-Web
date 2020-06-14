import styled from "styled-components";
import { Admin } from "../utils/colors";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25em;
  height: 13em;
  background: ${Admin.background};
  border: 3px solid ${Admin.text};
  border-radius: 10px;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Titulo = styled.h1`
  font-weight: 500;
  font-size: 30px;
  text-align: center;
  color: ${Admin.text};
`;

export const Texto = styled.h4`
  color: ${Admin.text};
  font-weight: normal;
  font-size: 16px;
`;

export const LinhaBotoes = styled.div`
  margin-top: 1em;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const Botao = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border-width: 0;
  color: ${Admin.background};
  font-size: 16px;
  margin: 0 0 0 2em;
  cursor: pointer;
`;
