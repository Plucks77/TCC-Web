import React, { useEffect, useState } from "react";
import { FaPlus, FaLongArrowAltLeft } from "react-icons/fa";
import { GoX } from "react-icons/go";
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
  CampoFoto,
  Foto,
  AdicionarFoto,
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
  local_id: yup.number().min(1, "É preciso definir um local para este pacote!"),
  city_id: yup.number().min(1, "É preciso definir uma cidade para este pacote!"),
});

interface pacote {
  id: number;
  category_id: number;
  guia_id: number;
  city_id: number;
  local_id: number;
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

interface city {
  id: number;
  name: string;
}

interface local {
  id: number;
  name: string;
}

interface foto {
  id: string;
  image_url: string;
}

interface historyPacoteId {
  pacote_id: string;
}

interface Arquivo {
  id: string;
  file: File;
}

const AdminPacote: React.FC = () => {
  const [pacote, setPacote] = useState<pacote>();
  const [guias, setGuias] = useState<guia[]>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [cities, setCities] = useState<city[]>([]);
  const [locals, setLocals] = useState<local[]>([]);
  const [deletedFotos, setDeletedFotos] = useState<string[]>([]);
  const [fotos, setFotos] = useState<foto[]>([]);
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
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

  useEffect(() => {
    if (pacote) {
      api
        .get(`local/city/${pacote?.city_id}`, config)
        .then((res) => {
          setLocals(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            handleLogout();
          }
        });
    }
  }, [pacote]);

  useEffect(() => {
    if (pacote) {
      api
        .get(`/fotos/pacote/${pacote.id}`, config)
        .then((res) => {
          setFotos(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            handleLogout();
          }
        });
    }
  }, [pacote]);

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

  function handleSimulateClickInput() {
    const btn = document.querySelector<HTMLInputElement>("#input_foto");
    btn?.click();
  }
  function handlePreview(file: React.ChangeEvent<HTMLInputElement>) {
    if (file.target.files != null) {
      const newFoto = {
        id: Math.random().toString(36).substr(2, 9),
        image_url: URL.createObjectURL(file.target.files[0]),
      };
      setFotos([...fotos, newFoto]);
      const arq = {
        id: newFoto.id,
        file: file.target.files[0],
      };
      setArquivos([...arquivos, arq]);
    }
  }

  function handleDeleteFoto(oldFoto: foto) {
    const newFotos = fotos.filter((item) => item.id !== oldFoto.id);
    setFotos(newFotos);
    if (typeof oldFoto.id === "number") {
      setDeletedFotos([...deletedFotos, oldFoto.id]);
    }
    if (typeof oldFoto.id === "string") {
      const newArquivos = arquivos.filter((item) => item.id !== oldFoto.id);
      setArquivos(newArquivos);
    }
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
            city_id: pacote.city_id,
            local_id: pacote.local_id,
            name: pacote.name,
            description: pacote.description,
            price: pacote.price,
          }}
          validationSchema={pacoteSchema}
          onSubmit={(values, actions) => {
            const serializedPrice = values.price.replace("R$ ", "");
            values.price = serializedPrice;

            //UPLOAD dos arquivos
            if (arquivos.length > 0) {
              arquivos.map((arquivo) => {
                var formData = new FormData();
                formData.append("image", arquivo.file);
                formData.append("pacote_id", pacote.id.toString());
                api
                  .post(`/foto/create`, formData, config)
                  .catch((erro) => console.log(erro.response.data));
              });
            }

            //DELETE dos arquivos
            if (deletedFotos.length > 0) {
              deletedFotos.map((foto_id) => {
                api
                  .delete(`/foto/delete/${foto_id}`, config)
                  .catch((erro) => console.log(erro.response.data));
              });
            }

            //EDIT dos dados do pacote
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
                    value={props.values.city_id}
                  >
                    {cities.map((city) => (
                      <Option key={city.id} value={city.id}>
                        {city.name}
                      </Option>
                    ))}
                  </Select>
                </Campo>

                <Campo style={{ marginRight: "5em" }}>
                  <Titulo>Local</Titulo>
                  <Select onChange={props.handleChange("local_id")} value={props.values.local_id}>
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
                    readOnly={deleting ? true : false}
                    value={props.values.description}
                    onChange={props.handleChange("description")}
                    onBlur={props.handleBlur("description")}
                    maxLength={150}
                  />
                  <Erro>{props.touched.description && props.errors.description}</Erro>
                </CampoDescricao>
              </FileiraDescricao>

              <FileiraCampos>
                <Campo style={{ marginLeft: "5em", marginRight: "5em" }}>
                  <Titulo>Fotos</Titulo>

                  <CampoFoto>
                    {fotos &&
                      fotos.map((foto, i) => (
                        <div key={i} style={{ display: "flex" }}>
                          <GoX
                            style={{ position: "relative", left: 216, cursor: "pointer" }}
                            color={Admin.danger}
                            size={40}
                            onClick={() => handleDeleteFoto(foto)}
                          />
                          <Foto src={foto.image_url} />
                        </div>
                      ))}
                    <input
                      onChange={handlePreview}
                      id="input_foto"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", width: 256, justifyContent: "flex-end" }}>
                      <AdicionarFoto type="button" onClick={() => handleSimulateClickInput()}>
                        <FaPlus color={Admin.text} size={60} />
                      </AdicionarFoto>
                    </div>
                  </CampoFoto>
                </Campo>
              </FileiraCampos>

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
