import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
          <Routes>
            <Route path="" element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/new-form" element={<NewFormnPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastServiceWithProvider>
    </QueryClientProvider>
  );
}
