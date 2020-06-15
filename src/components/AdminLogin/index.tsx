import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import api from "../../api";
import { Admin } from "../utils/colors";
import {
  Container,
  LoaderContainer,
  Main,
  Titulo,
  Campo,
  Label,
  Input,
  Botao,
  Erro,
  FormErro,
  InputContainer,
  IconeContainer,
} from "./styles";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("O e-mail é necessária!")
    .min(8, "Seu e-mail tem pelo menos 8 dígitos!")
    .test("valida-email", "Por favor, digite um enderço de email válido!", (val) => {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(val);
    }),
  password: yup
    .string()
    .required("Sua senha é necessária!")
    .min(8, "Sua senha tem pelo menos 8 dígitos!"),
});

const AdminLogin: React.FC = () => {
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showing, setShowing] = useState(false);
  const history = useHistory();

  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          setLoading(true);
          api
            .post("admin/login", { email: values.email, password: values.password })
            .then((res) => {
              if (res.status === 200) {
                const { token, admin_id } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("admin_id", admin_id);
                history.push("/Admin");
              }
            })
            .catch((res) => {
              if (res.status !== 200) {
                setErro("Usuário ou senha incorretos!");
                actions.resetForm();
                setLoading(false);
              }
            });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Main>
              <Titulo>Login do administrador</Titulo>
              <Campo>
                <Label>E-mail</Label>
                <Input
                  type="email"
                  value={props.values.email}
                  onChange={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  maxLength={50}
                />
                <Erro>{props.touched.email && props.errors.email}</Erro>
              </Campo>

              <Campo>
                <Label>Senha</Label>
                <InputContainer>
                  <Input
                    type={showing ? "text" : "password"}
                    value={props.values.password}
                    onChange={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    maxLength={50}
                  />
                  <IconeContainer
                    onClick={() => {
                      setShowing(!showing);
                    }}
                  >
                    {showing ? (
                      <FaEyeSlash size={25} color={Admin.text} />
                    ) : (
                      <FaEye size={25} color={Admin.text} />
                    )}
                  </IconeContainer>
                </InputContainer>
                <Erro>{props.touched.password && props.errors.password}</Erro>
              </Campo>

              {erro && <FormErro>{erro}</FormErro>}
              {loading ? (
                <LoaderContainer>
                  <Loader type="ThreeDots" color={Admin.main} height={100} width={100} />
                </LoaderContainer>
              ) : (
                <Botao onClick={props.submitForm} type="button">
                  Entrar
                </Botao>
              )}
            </Main>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminLogin;
