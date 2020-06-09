import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
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
} from "./styles";

const AdminHome: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const [adminId, setAdminId] = useState("");

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin_id = localStorage.getItem("admin_id");
    if (token && admin_id) {
      setToken(token);
      setAdminId(admin_id);
      setReady(true);
    } else {
      history.push("/Admin/login");
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    history.push("/Admin/login");
  }

  function handleAddPacote() {
    console.log("Adicionar pacote");
  }

  return ready ? (
    <Container>
      <Header>
        <MenuSelecionado>Pacotes</MenuSelecionado>
        <MenuNaoSelecionado>Guias</MenuNaoSelecionado>
        <div style={{ flex: 5 }}></div>
        <Logout onClick={() => handleLogout()}>
          <FiLogOut color="36453B" size={60} />
        </Logout>
      </Header>

      <Tabela>
        <Circulo>
          <FaPlus
            style={{ cursor: "pointer" }}
            onClick={handleAddPacote}
            color="36453B"
            size={60}
          />
        </Circulo>

        <TabelaContainer>
          <TabelaTitulo>Nome</TabelaTitulo>
          <TabelaTitulo>Valor</TabelaTitulo>
        </TabelaContainer>

        <TabelaContainer>
          <TabelaTitulo>Nome</TabelaTitulo>
          <TabelaTitulo>Valor</TabelaTitulo>
        </TabelaContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>

        <PacoteContainer>
          <PacoteTexto>Pacote xxx</PacoteTexto>
          <PacoteTexto>R$ 2000,00</PacoteTexto>
        </PacoteContainer>
      </Tabela>
    </Container>
  ) : (
    <SpinnerContainer>
      <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
    </SpinnerContainer>
  );
};

export default AdminHome;
