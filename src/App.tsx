import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage, FaqPage, ListPage, NotFoundPage } from "src/pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
