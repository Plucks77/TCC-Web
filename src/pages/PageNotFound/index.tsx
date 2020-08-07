import React from "react";
import { Link } from "react-router-dom";

import { Container, Texto } from "./styles";

const PageNotFound: React.FC = () => {
  return (
    <Container>
      <Texto>404 - Página não encontrada. ¯\_(ツ)_/¯ </Texto>

      <Link to="/Admin/login">Login do admin</Link>
    </Container>
  );
};

export default PageNotFound;
