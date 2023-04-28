import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage, FaqPage, ListPage, NotFoundPage } from "src/pages";

import ToastServiceWithProvider from "./components/Toast/ToastService";
import NewFormnPage from "./pages/NewFormPage/NewFormPage";
import { Layout } from "./components";
import fontAwesomeConfig from "./FontAwesomeConfig";

fontAwesomeConfig();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastServiceWithProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/newForm" element={<NewFormnPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ToastServiceWithProvider>
    </QueryClientProvider>
  );
}
