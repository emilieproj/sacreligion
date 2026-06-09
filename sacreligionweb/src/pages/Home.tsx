import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const BASE = import.meta.env.BASE_URL;

export default function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    if (input === "sacreligious") {
      navigate("/secret");
    }
  };

  return (
    <>
      {/* background video */}
      <video autoPlay muted loop playsInline className="background-video">
        <source src={BASE + "background.mp4"} />
      </video>

      {/* logo */}
      <div className="center-content">
        <img src={BASE + "logo.png"} className="logo" />
      </div>

      {/* password UI */}
      <div className="secret-container">
        <h1>Do you know the password?</h1>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={submit}>Enter</button>
      </div>

      <Footer />
    </>
  );
}