import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SecretApp from "./pages/SecretApp";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret" element={<SecretApp />} />
      </Routes>
    </HashRouter>
  );
}