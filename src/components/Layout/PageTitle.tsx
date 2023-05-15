import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  children?: ReactNode;
};

export default function PageTitle({ children }: Props) {
  const { t } = useTranslation();

  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {children || t("title")}
        </h1>
      </div>
    </header>
  );
}
