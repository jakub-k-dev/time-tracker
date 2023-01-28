import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage, FaqPage, ListPage, NotFoundPage } from "src/pages";

import { Layout } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
