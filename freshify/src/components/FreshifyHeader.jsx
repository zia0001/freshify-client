import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import GroceryDisplay from "./GroceryDisplay";

export default function FreshifyHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column">
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark w-100 position-fixed top-0 start-0"
        style={{
          backgroundColor: "#2f855a",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/home"
            style={{
              color: "#ecc94b",
              fontWeight: "bold",
              fontSize: "1.875rem",
            }}
          >
            Freshify
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <form className="d-flex mx-auto" style={{ maxWidth: "400px" }}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-light" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <ul className="navbar-nav ms-auto me-3">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center me-3 position-relative">
              <Link to="/cart" className="text-white position-relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>

            <div className="d-flex gap-2">
              {isLoggedIn ? (
                <button 
                  className="btn btn-outline-light rounded-pill"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light rounded-pill">
                    Log In
                  </Link>
                  <Link to="/signup" className="btn btn-light rounded-pill text-success">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Empty div to offset the fixed navbar */}
      <div style={{ height: "56px" }}></div>

      {/* Categories Section */}
      <section 
        id="categorySection" 
        className="py-5" 
        style={{ backgroundColor: "#e9f7ef", paddingTop: "40px", minHeight: "500px" }}
      >
        <div className="w-100 px-3">
          <h2 className="mb-4 text-success text-center" style={{ fontWeight: "500" }}>
            Shop by Category
          </h2>
          <div className="d-flex flex-wrap justify-content-center gap-4 px-3">
            {[
              { name: "Fruits", icon: "🍎" },
              { name: "Vegetables", icon: "🥦" },
              { name: "Dairy", icon: "🧀" },
              { name: "Bakery", icon: "🍞" },
              { name: "Meat", icon: "🥩" },
              { name: "Snacks", icon: "🍪" },
              { name: "Beverages", icon: "🥤" },
              { name: "Household", icon: "🧼" }
            ].map((category, index) => (
              <div
                key={index}
                className="card text-center border-0 shadow-sm category-card"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  width: "160px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 128, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="card-body">
                  <div style={{ fontSize: "2rem" }}>{category.icon}</div>
                  <h5 className="card-title mt-2">{category.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Include the GroceryDisplay component */}
      <GroceryDisplay />
    </div>
  );
}