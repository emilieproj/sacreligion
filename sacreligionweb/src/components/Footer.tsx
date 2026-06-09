import "./Footer.css";

const BASE = import.meta.env.BASE_URL;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img
          src={BASE + "imagelogo.png"}
          alt="Logo"
          className="footer-logo"
        />

        <a href="https://www.instagram.com/sac.religion/" className="footer-link">
          Instagram
        </a>

        <a href="https://l.instagram.com/?u=https%3A%2F%2Flinktr.ee%2Fsacreligion%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnDXoFcpfLRfOgexdD3nbOMGzK_odyOigUZ7eL-jvZ3rU7-oV8jo_NDfDvEu8_aem_XOEIn86ijNCSK10RhkuXYQ&e=AUBeZ6WMibDoisOqAqAK5qTZ6-u2KNGq9genJ1fMzzBzHl5AKAu-Zi5KuNehyhTB7az_NFF5LwKAp4lWec4BQokeHTznSAaIEOLKVltHoa7zL1K49qf_k4eRAYGyVF8Ix4jahJY" className="footer-link">
          Timetree
        </a>
      </div>
    </footer>
  );
}