import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>
            &copy; 2025. All rights reserved by{" "}
            <Link to="/" style={{ fontStyle: "italic", marginLeft: "1rem" }}>
              Recipe Studio
            </Link>
            <Link
              to="/contact"
              style={{ fontStyle: "italic", marginLeft: "1rem" }}
            >
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
