import React, { useEffect, useState } from "react";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { Formik } from "formik";
import * as yup from "yup";

import InputMask from "react-input-mask";

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
  InputTel,
  FileiraDescricao,
  InputDescricao,
  CampoDescricao,
  BotoesContainer,
  Main,
  Botao,
  LoadingContainer,
  Erro,
} from "./styles";

const guiaSchema = yup.object({
  name: yup
    .string()
    .required("O nome do guia é necessário!")
    .min(5, "O nome do guia deve ter pelo menos 5 dígitos!"),
  tel: yup
    .string()
    .required("O número de telefone do guia é necessário!")
    .min(10, "O número de telefone do guia deve ter pelo menos 12 dígitos!")
    .test("valida-telefone", "O número de telefone deve ter pelo menos 12 dígitos!", (val) => {
      var re = /([(][0-9]{2}[)])\s[0-9]{4,5}\-[0-9]{3,4}/;
      return re.test(val);
    }),
  description: yup
    .string()
    .required("A descrição do guia é necessário!")
    .min(5, "A descrição do guia deve ter pelo menos 5 dígitos!"),
});

const AdminCreateGuia: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      {!isSubmitting ? (
        <Formik
          initialValues={{ name: "", tel: "", description: "" }}
          validationSchema={guiaSchema}
          onSubmit={(values, actions) => {
            const serializedTel = values.tel
              .replace(" ", "")
              .replace("(", "")
              .replace(")", "")
              .replace("-", "")
              .replace("_", "");

            setIsSubmitting(true);
            api
              .post(
                "register/guia",
                { name: values.name, tel: serializedTel, description: values.description },
                config
              )
              .then((res) => {
                if (res.status === 200) {
                  history.goBack();
                }
              })
              .catch((erro) => {
                if (erro.response.status === 401) {
                  localStorage.clear();
                  history.push("/Admin/login");
                }
              });
          }}
        >
          {(props) => (
            <Main onSubmit={props.handleSubmit}>
              <FileiraCampos>
                <Campo style={{ marginLeft: "5em" }}>
                  <Titulo>Nome</Titulo>
                  <Input
                    type="text"
                    value={props.values.name}
                    onChange={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                    maxLength={50}
                  />
                  <Erro>{props.touched.name && props.errors.name}</Erro>
                </Campo>

                <Campo style={{ marginRight: "5em" }}>
                  <Titulo>Telefone</Titulo>
                  {/* <Input
                    type="text"
                    value={props.values.tel}
                    onChange={props.handleChange("tel")}
                    onBlur={props.handleBlur("tel")}
                    maxLength={14}
                  /> */}
                  <InputMask
                    style={InputTel}
                    mask="(99) 99999-9999"
                    value={props.values.tel}
                    onChange={props.handleChange("tel")}
                    onBlur={props.handleBlur("tel")}
                  />
                  <Erro>{props.touched.tel && props.errors.tel}</Erro>
                </Campo>
              </FileiraCampos>

              <FileiraDescricao>
                <CampoDescricao>
                  <Titulo>Descrição</Titulo>
                  <InputDescricao
                    value={props.values.description}
                    onChange={props.handleChange("description")}
                    onBlur={props.handleBlur("description")}
                    maxLength={150}
                  />
                  <Erro>{props.touched.description && props.errors.description}</Erro>
                </CampoDescricao>
              </FileiraDescricao>

              <BotoesContainer>
                <Botao type="submit" style={{ background: "#818BE7" }}>
                  Criar
                </Botao>
              </BotoesContainer>
            </Main>
          )}
        </Formik>
      ) : (
        <Main>
          <SpinnerContainer>
            <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
          </SpinnerContainer>
        </Main>
      )}
    </Container>
  ) : (
    <LoadingContainer>
      <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
    </LoadingContainer>
  );
};

export default AdminCreateGuia;
