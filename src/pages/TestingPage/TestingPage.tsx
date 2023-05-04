import { Button, PageTitle } from "src/components";
import PageContent from "src/components/Layout/PageContent";
import { useToastService } from "src/components/Toast/context";

export default function TestingPage() {
  const { addNewToastAction } = useToastService();
  return (
    <>
      <PageTitle>Testing</PageTitle>
      <PageContent>
        <div className="flex gap-4">
          <Button
            onClick={() =>
              addNewToastAction({
                content: "Success text",
                title: "Success",
                variant: "success",
              })
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              addNewToastAction({
                content: "Error text",
                title: "Error",
                variant: "error",
              })
            }
          >
            Error
          </Button>
          <Button
            onClick={() =>
              addNewToastAction({
                content: "Warning text",
                title: "Warning",
                variant: "warning",
              })
            }
          >
            Warning
          </Button>
          <Button
            onClick={() =>
              addNewToastAction({
                content: "Info text",
                title: "Info",
                variant: "info",
              })
            }
          >
            Info
          </Button>
        </div>
      </PageContent>
    </>
  );
}
