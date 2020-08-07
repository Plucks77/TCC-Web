import styled from "styled-components";
import { Admin } from "../../utils/helpers/colors";

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
  height: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  align-items: center;
  justify-content: center;
  background: #e86868;
`;

export const Titulo = styled.h1`
  font-weight: 500;
  font-size: 30px;
  color: ${Admin.background};
`;

export const IconeContainer = styled.div`
  margin-right: 1em;
`;

export const TextoContainer = styled.div`
  display: flex;
`;

export const Texto = styled.h4`
  color: ${Admin.text};
  font-weight: normal;
  font-size: 16px;
`;

export const LinhaBotoes = styled.div`
  margin: 1em 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const Botao = styled.button`
  width: 7em;
  height: 2em;
  border-radius: 10px;
  border-width: 0;
  color: ${Admin.background};
  font-size: 16px;
  margin: 0 0 0 2em;
  cursor: pointer;
`;
