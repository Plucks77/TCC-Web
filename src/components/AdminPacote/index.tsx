import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import InputMask from "react-input-mask";

import { ModalDeleteConfirmation as Modal } from "../ModalDeleteConfirmation";
import { isLogged } from "../utils/helpers/Admin";
import api from "../../api";
import { Admin } from "../utils/colors";
import {
  Container,
  SpinnerContainer,
  Header,
  Icone,
  FileiraCampos,
  Campo,
  Titulo,
  Input,
  InputPrice,
  Select,
  Option,
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

const pacoteSchema = yup.object({
  name: yup
    .string()
    .required("O nome do pacote é necessário!")
    .min(5, "O nome do pacote deve ter pelo menos 5 dígitos!"),
  description: yup
    .string()
    .required("A descrição do pacote é necessária!")
    .min(5, "A descrição do pacote deve ter pelo menos 5 dígitos!"),
  price: yup.string().required("É necessário definir um preço para o pacote!"),
});

interface pacote {
  id: number;
  category_id: number;
  guia_id: number;
  name: string;
  description: string;
  price: string;
}

interface guia {
  id: number;
  name: string;
}

interface category {
  id: number;
  name: string;
}

interface historyPacoteId {
  pacote_id: string;
}

const AdminPacote: React.FC = () => {
  const [pacote, setPacote] = useState<pacote>();
  const [guias, setGuias] = useState<guia[]>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [ready, setReady] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      handleLogout();
    }
  }, []);

  useEffect(() => {
    const history_pacote_id = history.location.state;
    const { pacote_id } = history_pacote_id as historyPacoteId;
    api
      .get(`pacote/${pacote_id}`, config)
      .then((res) => {
        res.data.price = `R$ ${res.data.price}`;
        setPacote(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          handleLogout();
        }
      });
  }, []);

  useEffect(() => {
    api
      .get("list/guias", config)
      .then((res) => {
        if (res.status === 200) {
          setGuias(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          handleLogout();
        }
      });
  }, []);

  useEffect(() => {
    api
      .get("list/category", config)
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data);
        }
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
      .delete(`pacote/delete/${pacote?.id}`, config)
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
          <FaLongArrowAltLeft color={Admin.text} size={60} />
        </Icone>

        <Icone onClick={() => handleLogout()}>
          <FiLogOut color={Admin.text} size={60} />
        </Icone>
      </Header>

      {deleting && (
        <ModalContainer>
          <Modal
            texto={`Deseja realmente excluir o pacote ${pacote?.name} ?`}
            delete={() => handleDelete()}
            close={() => handleCloseModal()}
          />
        </ModalContainer>
      )}

      {pacote ? (
        <Formik
          initialValues={{
            category_id: pacote.category_id,
            guia_id: pacote.guia_id,
            name: pacote.name,
            description: pacote.description,
            price: pacote.price,
          }}
          validationSchema={pacoteSchema}
          onSubmit={(values, actions) => {
            const serializedPrice = values.price.replace("R$ ", "");
            values.price = serializedPrice;
            api
              .put(`pacote/edit/${pacote.id}`, values, config)
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
                  <Titulo>Guia</Titulo>
                  <Select onChange={props.handleChange("guia_id")} value={props.values.guia_id}>
                    {guias.map((guia) => (
                      <Option key={guia.id} value={guia.id}>
                        {guia.name}
                      </Option>
                    ))}
                  </Select>
                </Campo>
              </FileiraCampos>

              <FileiraCampos>
                <Campo style={{ marginLeft: "5em" }}>
                  <Titulo>Categoria</Titulo>
                  <Select
                    onChange={props.handleChange("category_id")}
                    value={props.values.category_id}
                  >
                    {categories.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Campo>

                <Campo style={{ marginRight: "5em" }}>
                  <Titulo>Valor</Titulo>
                  {/* <Input
                    readOnly={deleting ? true : false}
                    type="number"
                    value={props.values.price}
                    onChange={props.handleChange("price")}
                    onBlur={props.handleBlur("price")}
                    maxLength={50}
                    step="0.1"
                  /> */}
                  <InputMask
                    style={InputPrice}
                    mask="R$ 999999999"
                    maskChar=""
                    value={props.values.price}
                    onChange={props.handleChange("price")}
                    onBlur={props.handleBlur("price")}
                  />
                  <Erro>{props.touched.price && props.errors.price}</Erro>
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
                <Botao type="submit" style={{ background: `${Admin.main}` }}>
                  Salvar
                </Botao>
                <Botao
                  onClick={() => handleOpenDelete()}
                  type="button"
                  style={{ background: `${Admin.danger}` }}
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
            <Loader type="ThreeDots" color={Admin.main} height={100} width={100} />
          </SpinnerContainer>
        </Main>
      )}
    </Container>
  ) : (
    <LoadingContainer>
      <Loader type="ThreeDots" color={Admin.main} height={100} width={100} />
    </LoadingContainer>
  );
};

export default AdminPacote;
