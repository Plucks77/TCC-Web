import React from "react";

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
import { FaRegTrashAlt } from "react-icons/fa";

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
          <FaRegTrashAlt size={25} color="#eeeeee" />
        </IconeContainer>
        <Titulo>Excluir</Titulo>
      </Header>

      <TextoContainer>
        <Texto>{props.texto} </Texto>
      </TextoContainer>

      <LinhaBotoes>
        <Botao onClick={props.close} style={{ backgroundColor: "#818be7" }}>
          Não
        </Botao>
        <Botao onClick={props.delete} style={{ backgroundColor: "#E86868" }}>
          Sim
        </Botao>
      </LinhaBotoes>
    </Container>
  );
};
