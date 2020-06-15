import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import InputMask from "react-input-mask";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import { ModalDeleteConfirmation as Modal } from "../ModalDeleteConfirmation";

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
  ModalContainer,
} from "./styles";

const guiaSchema = yup.object({
  name: yup
    .string()
    .required("O nome do guia é necessário!")
    .min(5, "O nome do guia deve ter pelo menos 5 dígitos!"),
  tel: yup
    .string()
    .required("O número de telefone do guia é necessário!")
    .min(13, "O telefone do guia deve ter pelo menos (DDD) +8 dígitos!")
    .test("valida-telefone", "O telefone deve estar no formato (DDD) +8 dígitos!", (val) => {
      var re = /([(][0-9]{2}[)])\s([0-9]{8,9})/;
      return re.test(val);
    }),
  description: yup
    .string()
    .required("A descrição do guia é necessária!")
    .min(5, "A descrição do guia deve ter pelo menos 5 dígitos!"),
});

interface guia {
  id: number;
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
  const [deleting, setDeleting] = useState(false);

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
        const ddd = res.data.tel.slice(0, 2);
        const tel = res.data.tel.slice(2);
        const serializedTel = `(${ddd}) ${tel}`;
        res.data.tel = serializedTel;

        setGuia(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          handleLogout();
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

  function handleOpenDelete() {
    setDeleting(true);
  }

  function handleCloseModal() {
    setDeleting(false);
  }

  function handleDelete() {
    api
      .delete(`delete/guia/${guia?.id}`, config)
      .then((res) => {
        if (res.status === 200) {
          handleNavigateBack();
        }
      })
      .catch((erro) => {
        if (erro.response.status === 401) {
          handleLogout();
        }
      });
  }

  return ready ? (
    <Container>
      <Header style={deleting ? { opacity: 0.5 } : {}}>
        <Icone onClick={() => handleNavigateBack()}>
          <FaLongArrowAltLeft color="#36453B" size={60} />
        </Icone>

        <Icone onClick={() => handleLogout()}>
          <FiLogOut color="#36453B" size={60} />
        </Icone>
      </Header>

      {deleting && (
        <ModalContainer>
          <Modal
            texto={`Deseja realmente excluir o guia ${guia?.name} ?`}
            delete={() => handleDelete()}
            close={() => handleCloseModal()}
          />
        </ModalContainer>
      )}

      {guia ? (
        <Formik
          initialValues={{ name: guia.name, tel: guia.tel, description: guia.description }}
          validationSchema={guiaSchema}
          onSubmit={(values, actions) => {
            const id = guia.id;
            const serializedTel = values.tel
              .replace(" ", "")
              .replace("(", "")
              .replace(")", "")
              .replace("-", "")
              .replace("_", "");
            setGuia(undefined);
            api
              .put(
                `edit/guia/${id}`,
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
                  handleLogout();
                }
              });
          }}
        >
          {(props) => (
            <Main onSubmit={props.handleSubmit} style={deleting ? { opacity: 0.5 } : {}}>
              <FileiraCampos>
                <Campo style={{ marginLeft: "5em" }}>
                  <Titulo>Nome</Titulo>
                  <Input
                    readOnly={deleting ? true : false}
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
                  <InputMask
                    readOnly={deleting ? true : false}
                    style={InputTel}
                    mask="(99) 999999999"
                    maskChar=""
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
                    readOnly={deleting ? true : false}
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
                  Salvar
                </Botao>
                <Botao
                  onClick={() => handleOpenDelete()}
                  type="button"
                  style={{ background: "#E86868" }}
                >
                  Excluir
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

export default AdminGuia;
