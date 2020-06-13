import React from "react";

import { Container, Titulo, LinhaBotoes, Botao, Texto, Header } from "./styles";

interface propsType {
  texto: string;
  close: () => void;
  delete: () => void;
}

export const ModalDeleteConfirmation: React.FC<propsType> = (props: propsType) => {
  return (
    <Container>
      <Header>
        <Titulo> Deletar</Titulo>
      </Header>

      <Texto>{props.texto}</Texto>

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
