import { Link } from "react-router";

export default function Home() {
  
  return (
    <section className="banner-sec">
      <div className="container">
        <div className="row">
          <div className="banner-content">
            <h6>Mix It, Make It</h6>
            <h2>Where Health Meets Flavor in Every Bite</h2>
            <p>
              Fill your kitchen with fresh, wholesome ingredients and simple,
              nutritious recipes that nourish your body and soul.
            </p>
            <div className="nav-btn mt-4">
              <Link to="/recipes/create">
                Start Cooking Today <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
