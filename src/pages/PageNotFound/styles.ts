import styled from "styled-components";
import { Admin } from "../../utils/helpers/colors";

export const Container = styled.div`
  min-height: 100vh;
  background: ${Admin.background};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Texto = styled.h1`
  color: ${Admin.text};
  font-size: 25px;
  font-weight: 500;
`;
