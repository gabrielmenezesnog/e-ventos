"use client";

import Input from "@/components/atoms/Input";
import { useAuth } from "@/context/Auth";
import React, { useState } from "react";

const AuthSection: React.FC = () => {
  const { isLoggedIn, login, signUp } = useAuth();
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (isLoggedIn || isRegister) {
      signUp(email, password);
      return;
    }

    login(email, password);
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
            onClick={() => setIsRegister(!isRegister)}
            className="text-primary icon_button font-semibold"
          >
            {isRegister ? "Entrar" : "Cadastre-se"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
