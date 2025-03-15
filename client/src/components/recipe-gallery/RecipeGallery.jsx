import { Link } from "react-router";

export default function RecipeGallery() {
  return (
    <section className="py-5 service-sec">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <p className="title-p">
              <img src="imgs/p-img.png" alt="" />
              Our Creations
            </p>
            <h2 className="title-h">Recipe Studio Specials</h2>
            <p>
              Explore our carefully crafted recipes, made with love and the
              freshest ingredients. Perfect meals for every occasion.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-4 col-md-6">
            <div className="service-box">
              <div className="ser-img">
                <img src="imgs/s-1.png" alt="" />
              </div>
              <div className="ser-text">
                <h4>Combo Pack</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maxime adipisci error rerum quas, repellat dolore!
                </p>
                <div className="ser-arr">
                  <Link to="/recipes/details">
                    View full item <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-box">
              <div className="ser-img">
                <img src="imgs/s-2.png" alt="" />
              </div>
              <div className="ser-text">
                <h4>Chicken</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maxime adipisci error rerum quas, repellat dolore!
                </p>
                <div className="ser-arr">
                  <Link to="#">
                    View full item <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-box">
              <div className="ser-img">
                <img src="imgs/s-3.png" alt="" />
              </div>
              <div className="ser-text">
                <h4>chipotle Chicken</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maxime adipisci error rerum quas, repellat dolore!
                </p>
                <div className="ser-arr">
                  <Link to="#">
                    View full item <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-box">
              <div className="ser-img">
                <img src="imgs/s-4.png" alt="" />
              </div>
              <div className="ser-text">
                <h4>Tacos</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maxime adipisci error rerum quas, repellat dolore!
                </p>
                <div className="ser-arr">
                  <Link to="#">
                    View full item <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-box">
              <div className="ser-img">
                <img src="imgs/s-5.png" alt="" />
              </div>
              <div className="ser-text">
                <h4>Pasta</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maxime adipisci error rerum quas, repellat dolore!
                </p>
                <div className="ser-arr">
                  <Link to="#">
                    View full item <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-box">
              <div className="ser-img">
                <img src="imgs/s-6.png" alt="" />
              </div>
              <div className="ser-text">
                <h4>Chicken Tikka</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maxime adipisci error rerum quas, repellat dolore!
                </p>
                <div className="ser-arr">
                  <Link to="#">
                    View full item <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
