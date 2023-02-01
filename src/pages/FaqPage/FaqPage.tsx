import { PageTitle } from "src/components";

import FaqList from "./components/FaqList";

export default function FaqPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Faq Page</PageTitle>;
      <FaqList />
    </div>
  );
}
