import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SecretPassword() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (input.trim() === "sacreligious") {
      navigate("/secret");
    }
  }, [input, navigate]);

  return (
    <div className="secret-container">
      <h2 className="secret-title">Do you know the password?</h2>

      <input
        className="secret-input"
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter password..."
      />
    </div>
  );
}