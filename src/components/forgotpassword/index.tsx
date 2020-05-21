import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";

import api from "../../api";
import {
  Container,
  Campos,
  Titulo,
  DivCampo,
  Input,
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
    .test("passwords-match", "Verifique se digitou a mesma senha!", function (
      value
    ) {
      return this.parent.senha === value;
    }),
});

interface IValue {
  senha: string;
  confirmaSenha: string;
}

const Forgotpassword: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  let { token, id } = useParams();

  useEffect(() => {
    async function execute() {
      await api.post("/validate", { token, id }).then((response) => {
        console.log(response);
        setIsValid(true);
      });
    }
    execute();
  }, []);

  async function handleEnviar(values: IValue) {
    api.put("/changepassword/id", { password: values.senha });
  }

  return (
    <Container>
      <Formik
        initialValues={{ senha: "", confirmaSenha: "" }}
        validationSchema={changeSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          // handleEnviar(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Campos>
              <Titulo>Alterar senha</Titulo>

              <DivCampo>
                <Label>Digite uma nova senha</Label>
                <Input
                  type="password"
                  value={props.values.senha}
                  onChange={props.handleChange("senha")}
                  onBlur={props.handleBlur("senha")}
                  maxLength={50}
                />
                <Erro>{props.touched.senha && props.errors.senha}</Erro>
              </DivCampo>

              <DivCampo>
                <Label>Confirme sua senha</Label>
                <Input
                  type="password"
                  value={props.values.confirmaSenha}
                  onChange={props.handleChange("confirmaSenha")}
                  onBlur={props.handleBlur("confirmaSenha")}
                  maxLength={50}
                />
                <Erro>
                  {props.touched.confirmaSenha && props.errors.confirmaSenha}
                </Erro>
              </DivCampo>

              <Botao type="submit" disabled={props.isSubmitting}>
                Salvar
              </Botao>
            </Campos>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Forgotpassword;
