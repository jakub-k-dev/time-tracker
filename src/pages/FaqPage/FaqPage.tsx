import { PageTitle } from "src/components";
import PageContent from "src/components/Layout/PageContent";

import FaqList from "./components/FaqList";

export default function FaqPage() {
  return (
    <>
      <PageTitle>Faq Page</PageTitle>
      <PageContent>
        <FaqList />
      </PageContent>
    </>
  );
}
