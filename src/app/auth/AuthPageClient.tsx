"use client";

import PageHeader from "@/components/atoms/PageTitle";
import AuthSection from "@/components/molecules/AuthSection";
import { useTranslation } from "@/hooks/useTranslation";

export default function AuthPageClient() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        title={t('auth.pageTitle')}
        subtitle={t('auth.pageSubtitle')}
      />

      <div className="my-14">
        <div className="container">
          <AuthSection />
        </div>
      </div>
    </div>
  );
}
