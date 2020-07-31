import styled from "styled-components";
import { Admin } from "../utils/colors";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  background: ${Admin.background};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em 2em;
`;

export const Icone = styled.div`
  cursor: pointer;
`;

export const Main = styled.form`
  background: ${Admin.mainLight};
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 700px;
  margin: 0 5em 1em 5em;
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
  margin: 3em 5em 1em 5em;
  width: 100%;
  min-width: 640px;
`;

export const Titulo = styled.span`
  font-size: 30px;
  color: ${Admin.text};
  font-weight: 500;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 15em;
  height: 2em;
  border: 3px solid ${Admin.main};
  border-radius: 10px;
  padding: 2px 2px 2px 10px;
  font-size: 20px;
  color: ${Admin.text};
`;

export const InputPrice = {
  boxSizing: "border-box" as "border-box", //casting do boxSizing que por algum caralho de motivo precisa ser feito?!?
  width: "15em",
  height: "2em",
  border: `3px solid ${Admin.main}`,
  borderRadius: "10px",
  padding: "2px 2px 2px 10px",
  fontSize: "20px",
  color: `${Admin.text}`,
};

export const Select = styled.select`
  box-sizing: border-box;
  width: 15em;
  height: 2em;
  border: 3px solid ${Admin.main};
  border-radius: 10px;
  padding: 2px 2px 2px 10px;
  font-size: 20px;
  color: ${Admin.text};
  cursor: pointer;
`;

export const Option = styled.option`
  width: 15em;
  height: 30px;
  border: 3px solid ${Admin.main};
  border-radius: 10px;
  padding-left: 10px;
  font-size: 20px;
  color: ${Admin.text};
`;

export const InputDescricao = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 10em;
  border: 3px solid ${Admin.main};
  border-radius: 10px;
  padding-left: 10px;
  padding-top: 5px;
  font-size: 20px;
  color: ${Admin.text};
`;

export const CampoFoto = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 2em;
`;

export const Foto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-left: 1em;
  margin-bottom: 1em;
`;

export const AdicionarFoto = styled.button`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-left: 1em;
  cursor: pointer;
  background-color: #c4c4c4;
  opacity: 0.9;
  border: 1px solid transparent;
  :hover {
    opacity: 0.5;
  }
`;

export const BotoesContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin-right: 5em;
  margin-top: auto;
  margin-bottom: 1em;
`;

export const Botao = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 20px;
  border-width: 0;
  color: ${Admin.background};
  font-size: 25px;
  margin: 0 0 0 2em;
  cursor: pointer;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${Admin.background};
`;

export const Erro = styled.small`
  color: ${Admin.erro};
  font-size: 16px;
  align-self: center;
  margin-top: 1px;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 30;
`;
