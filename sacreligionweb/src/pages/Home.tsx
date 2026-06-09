import Footer from "../components/Footer";
import SecretPassword from "../components/SecretPassword";

export default function Home() {
  return (
    <>
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="center-content">
        <img src="/src/assets/logo.png" alt="Sacreligion" className="logo" />
        <SecretPassword />
      </div>

      <Footer />
    </>
  );
}