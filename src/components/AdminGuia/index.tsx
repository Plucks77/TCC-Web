import React, { useEffect, useState } from "react";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { useHistory } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import api from "../../api";

import {
  Container,
  SpinnerContainer,
  Header,
  Icone,
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
  LoadingContainer,
} from "./styles";

interface guia {
  name: string;
  description: string;
  tel: string;
}

interface historyGuiaId {
  guia_id: string;
}

const AdminGuia: React.FC = () => {
  const [guia, setGuia] = useState<guia>();
  const [ready, setReady] = useState(false);

  const history = useHistory();
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin_id = localStorage.getItem("admin_id");

    if (token && admin_id) {
      setReady(true);
    } else {
      history.push("/Admin/login");
    }
  }, []);

  useEffect(() => {
    const history_guia_id = history.location.state;
    const { guia_id } = history_guia_id as historyGuiaId;
    api
      .get(`show/guia/${guia_id}`, config)
      .then((res) => {
        setGuia(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
          history.push("/Admin/login");
        }
      });
  }, []);

  function handleNavigateBack() {
    history.goBack();
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/Admin/login");
  }

  return ready ? (
    <Container>
      <Header>
        <Icone onClick={() => handleNavigateBack()}>
          <FaLongArrowAltLeft color="#36453B" size={60} />
        </Icone>

        <Icone onClick={() => handleLogout()}>
          <FiLogOut color="#36453B" size={60} />
        </Icone>
      </Header>
      <Main>
        {guia ? (
          <>
            <FileiraCampos>
              <Campo style={{ marginLeft: "5em" }}>
                <Titulo>Nome</Titulo>
                <Input value={guia?.name} />
              </Campo>

              <Campo style={{ marginRight: "5em" }}>
                <Titulo>Telefone</Titulo>
                <Input value={guia?.tel} />
              </Campo>
            </FileiraCampos>

            <FileiraDescricao>
              <CampoDescricao>
                <Titulo>Descrição</Titulo>
                <InputDescricao value={guia?.description} />
              </CampoDescricao>
            </FileiraDescricao>
            <BotoesContainer>
              <Botao style={{ background: "#818BE7" }}>Salvar</Botao>
              <Botao style={{ background: "#E86868" }}>Excluir</Botao>
            </BotoesContainer>
          </>
        ) : (
          <SpinnerContainer>
            <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
          </SpinnerContainer>
        )}
      </Main>
    </Container>
  ) : (
    <LoadingContainer>
      <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
    </LoadingContainer>
  );
};

export default AdminGuia;
