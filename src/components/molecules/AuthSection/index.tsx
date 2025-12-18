"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useAuth } from "@/context/Auth";
import { useTranslation } from "@/hooks/useTranslation";
import React, { useState } from "react";

const AuthSection: React.FC = () => {
  const { t } = useTranslation();
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
          {isRegister ? t('auth.joinTitle') : t('auth.loginTitle')}
        </h1>

        <div className="w-96 p-5 bg-gray-100 shadow-md rounded-lg flex flex-col gap-5">
          <Input
            label={t('auth.email')}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="default"
            label={t('auth.continue')}
            onClick={() => handleAuth()}
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <p className="text-center mt-2">
            {isRegister ? t('auth.hasAccount') : t('auth.noAccount')}
          </p>

          <Button
            type="default"
            className="text-primary icon_button font-semibold"
            label={isRegister ? t('auth.login') : t('auth.signUp')}
            onClick={() => setIsRegister(!isRegister)}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
