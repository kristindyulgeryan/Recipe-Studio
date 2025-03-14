export default function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand logo" href="/">
            <img src="imgs/logo.jpg" alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/catalog">
                  Recipe Gallery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create">
                  Recipe Factory
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="register">
                  Sign Up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
