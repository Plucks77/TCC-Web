import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import InputMask from "react-input-mask";

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
  guia_id: yup.number().min(1, "É preciso definir um guia para este pacote!"),
  category_id: yup.number().min(1, "É preciso definir uma categoria para este pacote!"),
});

interface guia {
  id: number;
  name: string;
}

interface category {
  id: number;
  name: string;
}

const AdminCreatePacote: React.FC = () => {
  const [guias, setGuias] = useState<guia[]>([]);
  const [categories, setCategories] = useState<category[]>([]);
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
      handleLogout();
    }
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

      <Formik
        initialValues={{
          category_id: "0",
          guia_id: "0",
          name: "",
          description: "",
          price: "R$ ",
          date: "0",
        }}
        validationSchema={pacoteSchema}
        onSubmit={(values, actions) => {
          const serializedPrice = values.price.replace("R$ ", "");
          values.price = serializedPrice;

          api
            .post("pacote/create", values, config)
            .then((res) => {
              if (res.status === 200) {
                handleNavigateBack();
              }
            })
            .catch((erro) => {
              if (erro.response.status === 401) {
                console.log(erro.response);
                handleLogout();
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
                <Titulo>Guia</Titulo>
                <Select onChange={props.handleChange("guia_id")}>
                  <Option value="0">Selecione um guia</Option>
                  {guias.map((guia) => (
                    <Option key={guia.id} value={guia.id}>
                      {guia.name}
                    </Option>
                  ))}
                </Select>
                <Erro>{props.touched.guia_id && props.errors.guia_id}</Erro>
              </Campo>
            </FileiraCampos>

            <FileiraCampos>
              <Campo style={{ marginLeft: "5em" }}>
                <Titulo>Categoria</Titulo>
                <Select onChange={props.handleChange("category_id")}>
                  <Option value="0">Selecione uma categoria</Option>
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
                <Erro>{props.touched.category_id && props.errors.category_id}</Erro>
              </Campo>

              <Campo style={{ marginRight: "5em" }}>
                <Titulo>Valor</Titulo>
                {/* <Input
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
    </Container>
  ) : (
    <LoadingContainer>
      <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
    </LoadingContainer>
  );
};

export default AdminCreatePacote;
