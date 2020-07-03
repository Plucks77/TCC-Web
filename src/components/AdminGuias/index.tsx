import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

import api from "../../api";
import { isLogged } from "../utils/helpers/Admin";
import { Admin } from "../utils/colors";
import {
  Container,
  SpinnerContainer,
  Header,
  Menu,
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
    if (isLogged()) {
      setReady(true);
    } else {
      history.push("/Admin/login");
    }
  }, []);

  useEffect(() => {
    api
      .get<guia[]>("guia/list", config)
      .then((res) => {
        setGuias(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push("/Admin/login");
        }
      });
  }, []);

  function handleNavigatePacotes() {
    history.push("/Admin");
  }

  function handleNavigateGuia(id: number) {
    history.push("/Admin/guia", { guia_id: id });
  }

  function handleNavigateCreateGuia() {
    history.push("/Admin/create/guia");
  }

  return ready ? (
    <Container>
      <Header>
        <Menu selected={false} onClick={() => handleNavigatePacotes()}>
          Pacotes
        </Menu>
        <Menu selected={true}>Guias</Menu>
        <div style={{ flex: 5 }}></div>
        <Logout onClick={() => {}}>
          <FiLogOut color={Admin.text} size={60} />
        </Logout>
      </Header>
      <Tabela>
        {guias.length > 0 ? (
          <>
            <Circulo>
              <FaPlus
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigateCreateGuia()}
                color={Admin.text}
                size={60}
              />
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
            <Loader type="ThreeDots" color={Admin.main} height={100} width={100} />
          </SpinnerContainer>
        )}
      </Tabela>
    </Container>
  ) : (
    <LoadingContainer>
      <Loader type="ThreeDots" color={Admin.main} height={100} width={100} />
    </LoadingContainer>
  );
};

export default AdminGuias;
