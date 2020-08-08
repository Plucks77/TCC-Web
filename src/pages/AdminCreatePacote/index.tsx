import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GoX } from "react-icons/go";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import InputMask from "react-input-mask";

import api from "../../api";
import { isLogged } from "../../utils/helpers/Admin";
import { Admin } from "../../utils/helpers/colors";
import {
  Container,
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
  CampoFoto,
  FotoContainer,
  Foto,
  AdicionarFoto,
  BotoesContainer,
  Main,
  Botao,
  LoadingContainer,
  Erro,
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
  local_id: yup.number().min(1, "É preciso definir um local para este pacote!"),
  city_id: yup.number().min(1, "É preciso definir uma cidade para este pacote!"),
});

interface guia {
  id: number;
  name: string;
}

interface category {
  id: number;
  name: string;
}

interface city {
  id: number;
  name: string;
}

interface local {
  id: number;
  name: string;
}

interface imagem {
  id: string;
  arquivo: File;
  image_url: string;
}

const AdminCreatePacote: React.FC = () => {
  const [guias, setGuias] = useState<guia[]>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [cities, setCities] = useState<city[]>([]);
  const [locals, setLocals] = useState<local[]>([]);
  const [fotos, setFotos] = useState<imagem[]>([]);
  const [capa, setCapa] = useState<imagem>();
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
      handleLogout();
    }
  }, []);

  useEffect(() => {
    api
      .get("guia/list", config)
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
      .get("category/list", config)
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

  useEffect(() => {
    api
      .get("cities", config)
      .then((res) => {
        if (res.status === 200) {
          setCities(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          handleLogout();
        }
      });
  }, []);

  function handleChangeCity(city_id: number) {
    if (city_id > 0) {
      api
        .get(`local/city/${city_id}`, config)
        .then((res) => {
          if (res.status === 200) {
            setLocals(res.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            handleLogout();
          }
        });
    }
  }

  function handleNavigateBack() {
    history.goBack();
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/Admin/login");
  }

  function handleSimulateClickInputCapa() {
    const btn = document.querySelector<HTMLInputElement>("#input_pacote_foto");
    btn?.click();
  }

  function handlePreviewCapa(file: React.ChangeEvent<HTMLInputElement>) {
    if (file.target.files != null) {
      const newCapa = {
        id: Math.random().toString(36).substr(2, 9),
        arquivo: file.target.files[0],
        image_url: URL.createObjectURL(file.target.files[0]),
      };
      setCapa(newCapa);
    }
  }

  function handleSimulateClickInput() {
    const btn = document.querySelector<HTMLInputElement>("#input_foto");
    btn?.click();
  }

  function handlePreview(file: React.ChangeEvent<HTMLInputElement>) {
    if (file.target.files != null) {
      const newFoto = {
        id: Math.random().toString(36).substr(2, 9),
        arquivo: file.target.files[0],
        image_url: URL.createObjectURL(file.target.files[0]),
      };
      setFotos([...fotos, newFoto]);
    }
  }

  function handleDeleteFoto(oldFoto: imagem) {
    const newFotos = fotos.filter((item) => item.id !== oldFoto.id);
    setFotos(newFotos);
  }

  return ready ? (
    <Container>
      <Header>
        <Icone onClick={() => handleNavigateBack()}>
          <FaLongArrowAltLeft color={Admin.text} size={60} />
        </Icone>

        <Icone onClick={() => handleLogout()}>
          <FiLogOut color={Admin.text} size={60} />
        </Icone>
      </Header>

      <Formik
        initialValues={{
          category_id: "0",
          guia_id: "0",
          city_id: "0",
          local_id: "0",
          name: "",
          description: "",
          price: "R$ ",
          date: "0",
          image_url: "",
          capa: undefined,
          fotos: undefined,
        }}
        validationSchema={pacoteSchema}
        onSubmit={(values, actions) => {
          let erros = false;
          const serializedPrice = values.price.replace("R$ ", "");
          values.price = serializedPrice;

          if (!capa) {
            actions.setFieldError(
              "capa",
              "Selecione uma imagem para ser usada como a capa do pacote!"
            );
            erros = true;
          }

          if (fotos.length === 0) {
            actions.setFieldError("fotos", "Selecione pelo menos 1 foto para este pacote!");
            erros = true;
          }
          if (erros) {
            return;
          }

          var formData = new FormData();
          if (capa) formData.append("image", capa?.arquivo);
          formData.append("category_id", values.category_id);
          formData.append("guia_id", values.guia_id);
          formData.append("local_id", values.local_id);
          formData.append("name", values.name);
          formData.append("description", values.description);
          formData.append("price", values.price);
          formData.append("date", values.date);

          api
            .post("pacote/create", formData, config)
            .then((res) => {
              if (res.status === 200) {
                const id = res.data.pacote.id;
                fotos.map((foto) => {
                  var formData = new FormData();
                  formData.append("image", foto.arquivo);
                  formData.append("pacote_id", id);
                  api
                    .post(`/foto/create`, formData, config)
                    .catch((erro) => console.log(erro.response.data));
                });
                handleNavigateBack();
              }
            })
            .catch((erro) => {
              console.log(erro.message);
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

            <FileiraCampos>
              <Campo style={{ marginLeft: "5em" }}>
                <Titulo>Cidade</Titulo>
                <Select
                  onChange={(e) => {
                    props.handleChange("city_id")(e);
                    handleChangeCity(Number(e.target.value));
                  }}
                >
                  <Option value="0">Selecione uma cidade</Option>
                  {cities.map((city) => (
                    <Option key={city.id} value={city.id}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
                <Erro>{props.touched.city_id && props.errors.city_id}</Erro>
              </Campo>

              <Campo style={{ marginRight: "5em" }}>
                <Titulo>Local</Titulo>
                <Select onChange={props.handleChange("local_id")}>
                  <Option value="0">Selecione um local</Option>
                  {locals.map((local) => (
                    <Option key={local.id} value={local.id}>
                      {local.name}
                    </Option>
                  ))}
                </Select>
                <Erro>{props.touched.local_id && props.errors.local_id}</Erro>
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

            <FileiraCampos>
              <Campo style={{ marginLeft: "5em" }}>
                <Titulo>Capa do pacote</Titulo>
                {capa ? (
                  <Foto
                    src={capa.image_url}
                    style={{ cursor: "pointer" }}
                    onClick={handleSimulateClickInputCapa}
                  />
                ) : (
                  <>
                    <AdicionarFoto type="button" onClick={() => handleSimulateClickInputCapa()}>
                      <FaPlus color={Admin.text} size={60} />
                    </AdicionarFoto>
                    <Erro>{props.touched.capa && props.errors.capa}</Erro>
                  </>
                )}

                <input
                  id="input_pacote_foto"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePreviewCapa}
                  onBlur={props.handleBlur("capa")}
                />
              </Campo>
            </FileiraCampos>

            <FileiraCampos>
              <Campo style={{ marginLeft: "5em", marginRight: "5em" }}>
                <Titulo>Fotos</Titulo>

                <CampoFoto>
                  {fotos &&
                    fotos.map((foto, i) => (
                      <FotoContainer key={i}>
                        <GoX
                          style={{ cursor: "pointer" }}
                          color={Admin.text}
                          size={40}
                          onClick={() => {
                            handleDeleteFoto(foto);
                          }}
                        />
                        <Foto src={foto.image_url} />
                      </FotoContainer>
                    ))}
                  <input
                    onChange={handlePreview}
                    id="input_foto"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onBlur={props.handleBlur("fotos")}
                  />
                  <AdicionarFoto type="button" onClick={() => handleSimulateClickInput()}>
                    <FaPlus color={Admin.text} size={60} />
                  </AdicionarFoto>
                </CampoFoto>
                <Erro style={{ marginTop: "-2em" }}>
                  {fotos.length === 0 && props.touched.fotos && props.errors.fotos}
                </Erro>
              </Campo>
            </FileiraCampos>

            <BotoesContainer>
              <Botao type="submit" style={{ background: `${Admin.main}` }}>
                Criar
              </Botao>
            </BotoesContainer>
          </Main>
        )}
      </Formik>
    </Container>
  ) : (
    <LoadingContainer>
      <Loader type="ThreeDots" color={Admin.main} height={100} width={100} />
    </LoadingContainer>
  );
};

export default AdminCreatePacote;
