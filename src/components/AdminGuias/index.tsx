import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import api from "../../api";

import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import {
  Container,
  SpinnerContainer,
  Header,
  MenuSelecionado,
  MenuNaoSelecionado,
  Logout,
  Tabela,
  TabelaContainer,
  TabelaTitulo,
  PacoteContainer,
  PacoteTexto,
  Circulo,
  LoadingContainer,
} from "./styles";

interface guia {
  id: number;
  name: string;
  media: string;
}

const AdminGuias: React.FC = () => {
  const [guias, setGuias] = useState<guia[]>([]);
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
    api
      .get<guia[]>("list/guias", config)
      .then((res) => {
        setGuias(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push("/Admin/login");
        }
      });
  }, []);

  function handleNavitatePacotes() {
    history.push("/Admin");
  }

  function handleNavigateGuia(id: number) {
    history.push("/Admin/guia", { guia_id: id });
  }

  return ready ? (
    <Container>
      <Header>
        <MenuNaoSelecionado onClick={() => handleNavitatePacotes()}>Pacotes</MenuNaoSelecionado>
        <MenuSelecionado onClick={() => {}}>Guias</MenuSelecionado>
        <div style={{ flex: 5 }}></div>
        <Logout onClick={() => {}}>
          <FiLogOut color="#36453B" size={60} />
        </Logout>
      </Header>
      <Tabela>
        {guias.length > 0 ? (
          <>
            <Circulo>
              <FaPlus style={{ cursor: "pointer" }} onClick={() => {}} color="36453B" size={60} />
            </Circulo>
            <TabelaContainer>
              <TabelaTitulo>Nome</TabelaTitulo>
              <TabelaTitulo>Média das avaliações</TabelaTitulo>
            </TabelaContainer>

            {guias.map((guia) => (
              <PacoteContainer key={guia.id} onClick={() => handleNavigateGuia(guia.id)}>
                <PacoteTexto>{guia.name}</PacoteTexto>
                <PacoteTexto>{guia.media ? guia.media : "Ainda não possui avaliações"}</PacoteTexto>
              </PacoteContainer>
            ))}
          </>
        ) : (
          <SpinnerContainer>
            <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
          </SpinnerContainer>
        )}
      </Tabela>
    </Container>
  ) : (
    <LoadingContainer>
      <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
    </LoadingContainer>
  );
};

export default AdminGuias;
