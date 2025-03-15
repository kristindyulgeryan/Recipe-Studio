import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>
            &copy; 2025. All rights reserved by{" "}
            <Link to="/">Recipe Studio</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
