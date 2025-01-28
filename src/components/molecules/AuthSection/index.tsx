"use client";

import Input from "@/components/atoms/Input";
import { register } from "@/services/auth/register";
import React from "react";

const AuthSection: React.FC = () => {
  const [isRegister, setIsRegiste] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleAuth = async () => {
    await register({ email, password });
    window.location.reload();
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-5">
          {isRegister ? "Faça parte" : "Entre com sua conta"}
        </h1>

        <div className="w-96 p-5 bg-gray-100 shadow-md rounded-lg flex flex-col gap-5">
          <Input
            label="E-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => handleAuth()}
            className="text-white font-semibold"
          >
            CONTINUAR
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <p className="text-center mt-2">
            {isRegister ? "Já possui uma conta?" : "Não possui uma conta?"}
          </p>
          <button
            onClick={() => setIsRegiste(!isRegister)}
            className="text-primary icon_button font-semibold"
          >
            {isRegister ? "Entrar" : "Cadastre-se"}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6"></div>
    </div>
  );
};

export default AuthSection;
