import React from "react";
import { Form, Schema, ButtonToolbar, Button } from "rsuite";
import TextField from "../components/Forms/TextField";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Este campo es requerido."),
  password: StringType().isRequired("Este campo es requerido."),
});

const Login = () => {
  return (
    <div id="login" className="flex min-h-screen justify-center items-center flex-col">
      <img src="jpg/cesfam.jpg" alt="cesfam" className="h-40" />

      <Form model={model}>
        <TextField name="name" label="Usuario" />
        <TextField name="password" label="Contraseña" />

        <ButtonToolbar className="flex justify-center">
          <Button appearance="primary" type="submit">
            Iniciar sesión
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
};

export default Login;
