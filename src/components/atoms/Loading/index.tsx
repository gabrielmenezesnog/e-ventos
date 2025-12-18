"use-client";

import React from "react";
import { iLoadingProps } from "@/interfaces/iLoading";
import { useTranslation } from "@/hooks/useTranslation";

const Loading: React.FC<iLoadingProps> = ({ isDark = false }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-10">
      <p className={`mt-5 ${isDark ? "text-white" : "text-black"}`}>
        {t("common.loading")}
      </p>
    </div>
  );
};

export default Loading;
