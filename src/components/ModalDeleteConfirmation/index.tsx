import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import { Admin } from "../utils/colors";
import {
  Container,
  Titulo,
  IconeContainer,
  LinhaBotoes,
  Botao,
  Texto,
  Header,
  TextoContainer,
} from "./styles";

interface propsType {
  texto: string;
  close: () => void;
  delete: () => void;
}

export const ModalDeleteConfirmation: React.FC<propsType> = (props: propsType) => {
  return (
    <Container>
      <Header>
        <IconeContainer>
          <FaRegTrashAlt size={25} color={Admin.background} />
        </IconeContainer>
        <Titulo>Excluir</Titulo>
      </Header>

      <TextoContainer>
        <Texto>{props.texto} </Texto>
      </TextoContainer>

      <LinhaBotoes>
        <Botao onClick={props.close} style={{ backgroundColor: `${Admin.main}` }}>
          Não
        </Botao>
        <Botao onClick={props.delete} style={{ backgroundColor: `${Admin.danger}` }}>
          Sim
        </Botao>
      </LinhaBotoes>
    </Container>
  );
};
