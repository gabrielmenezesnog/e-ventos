import PageHeader from "@/components/atoms/PageTitle";
import AuthSection from "@/components/molecules/AuthSection";

export default async function AuthPage() {
  return (
    <div>
      <PageHeader title="AUTENTICAÇÃO" subtitle="ENTRE OU CADASTRE-SE" />

      <div className="my-14">
        <div className="container">
          <AuthSection />
        </div>
      </div>
    </div>
  );
}
