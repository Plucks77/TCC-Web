import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

import api from "../../api";
import { isLogged } from "../../utils/helpers/Admin";
import { Admin } from "../../utils/helpers/colors";
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

interface pacote {
  id: number;
  name: string;
  price: number;
}

const AdminHome: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [pacotes, setPacotes] = useState<pacote[]>([]);

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
      .get("pacotes", config)
      .then((res) => {
        if (res.status === 200) {
          setPacotes(res.data);
        }
      })
      .catch((erro) => {
        if (erro.response.status === 401) {
          history.push("/Admin/login");
        }
      });
  }, []);

  function handleLogout() {
    localStorage.clear();
    history.push("/Admin/login");
  }

  function handleNavigateGuias() {
    history.push("/Admin/guias");
  }

  function handleNavigatePacote(id: number) {
    history.push("/Admin/pacote", { pacote_id: id });
  }

  function handleNavigateCreatePacote() {
    history.push("/Admin/create/pacote");
  }

  return ready ? (
    <Container>
      <Header>
        <Menu selected={true}>Pacotes</Menu>
        <Menu selected={false} onClick={() => handleNavigateGuias()}>
          Guias
        </Menu>
        <div style={{ flex: 5 }}></div>
        <Logout onClick={() => handleLogout()}>
          <FiLogOut color={Admin.text} size={60} />
        </Logout>
      </Header>

      <Tabela>
        {pacotes.length > 0 ? (
          <>
            <Circulo>
              <FaPlus
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigateCreatePacote()}
                color={Admin.text}
                size={60}
              />
            </Circulo>

            <TabelaContainer>
              <TabelaTitulo>Nome</TabelaTitulo>
              <TabelaTitulo>Valor</TabelaTitulo>
            </TabelaContainer>

            {pacotes.map((pacote) => (
              <PacoteContainer key={pacote.id} onClick={() => handleNavigatePacote(pacote.id)}>
                <PacoteTexto>{pacote.name}</PacoteTexto>
                <PacoteTexto>R$ {pacote.price}</PacoteTexto>
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

export default AdminHome;
