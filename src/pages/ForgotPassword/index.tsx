import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Admin } from "../../utils/helpers/colors";
import api from "../../api";
import {
  Container,
  Campos,
  Titulo,
  DivCampo,
  Input,
  InputContainer,
  IconeContainer,
  Label,
  Botao,
  Erro,
} from "./styles";

const changeSchema = yup.object({
  senha: yup
    .string()
    .required("A senha é necessária!")
    .min(8, "Sua senha tem pelo menos 8 dígitos!"),
  confirmaSenha: yup
    .string()
    .required("Digite a mesma senha de cima!")
    .test("passwords-match", "Verifique se digitou a mesma senha!", function (value) {
      return this.parent.senha === value;
    }),
});

interface IValue {
  senha: string;
  confirmaSenha: string;
}

const ForgotPassword: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showing, setShowing] = useState(false);
  let { token, id } = useParams();

  useEffect(() => {
    api
      .post("/validate", { token, id })
      .then((response) => {
        setReady(true);
      })
      .catch(() => {
        setReady(true);
        setInvalid(true);
      });
  }, []);

  async function handleEnviar(values: IValue) {
    setIsSending(true);
    await api.put(`/changepassword/${id}`, { password: values.senha }).then((response) => {
      setIsChanged(true);
      setIsSending(false);
    });
  }

  return ready ? (
    <Container>
      {!isChanged && !invalid && (
        <Formik
          initialValues={{ senha: "", confirmaSenha: "" }}
          validationSchema={changeSchema}
          onSubmit={(values, actions) => {
            // console.log(values);
            handleEnviar(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Campos>
                <Titulo>Alterar senha</Titulo>

                <DivCampo>
                  <Label>Digite uma nova senha</Label>
                  <InputContainer>
                    <Input
                      type={showing ? "text" : "password"}
                      value={props.values.senha}
                      onChange={props.handleChange("senha")}
                      onBlur={props.handleBlur("senha")}
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
                  <Erro>{props.touched.senha && props.errors.senha}</Erro>
                </DivCampo>

                <DivCampo>
                  <Label>Confirme sua senha</Label>
                  <InputContainer>
                    <Input
                      type={showing ? "text" : "password"}
                      value={props.values.confirmaSenha}
                      onChange={props.handleChange("confirmaSenha")}
                      onBlur={props.handleBlur("confirmaSenha")}
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
                  <Erro>{props.touched.confirmaSenha && props.errors.confirmaSenha}</Erro>
                </DivCampo>
                {!isSending ? (
                  <Botao type="submit" disabled={props.isSubmitting}>
                    Salvar
                  </Botao>
                ) : (
                  <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
                )}
              </Campos>
            </form>
          )}
        </Formik>
      )}
      {isChanged && <Titulo>Senha alterada com sucesso!</Titulo>}
      {invalid && <Titulo>Token ou usuário inválido!</Titulo>}
    </Container>
  ) : (
    <Container>
      <Loader type="ThreeDots" color="#818be7" height={100} width={100} />
    </Container>
  );
};

export default ForgotPassword;
