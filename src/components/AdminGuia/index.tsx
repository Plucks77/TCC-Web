import React from "react";

import {
  Container,
  FileiraCampos,
  Campo,
  Titulo,
  Input,
  FileiraDescricao,
  InputDescricao,
  CampoDescricao,
  BotoesContainer,
  Main,
  Botao,
} from "./styles";

const AdminGuia: React.FC = () => {
  return (
    <Container>
      <Main>
        <FileiraCampos>
          <Campo style={{ marginLeft: "5em" }}>
            <Titulo>Nome</Titulo>
            <Input />
          </Campo>

          <Campo style={{ marginRight: "5em" }}>
            <Titulo>Telefone</Titulo>
            <Input />
          </Campo>
        </FileiraCampos>

        <FileiraDescricao>
          <CampoDescricao>
            <Titulo>Descrição</Titulo>
            <InputDescricao />
          </CampoDescricao>
        </FileiraDescricao>
        <BotoesContainer>
          <Botao style={{ background: "#818BE7" }}>Salvar</Botao>
          <Botao style={{ background: "#E86868" }}>Excluir</Botao>
        </BotoesContainer>
      </Main>
    </Container>
  );
};

export default AdminGuia;
