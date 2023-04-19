import { PageTitle } from "src/components";
import PageContent from "src/components/Layout/PageContent";

import NewForm from "./components/NewForm/NewForm";

export default function NewFormnPage() {
  return (
    <>
      <PageTitle>New form</PageTitle>
      <PageContent>
        <NewForm />
      </PageContent>
    </>
  );
}
