import FreshifyHeader from './FreshifyHeader';
import GroceryDisplay from './GroceryDisplay';

function HomePage() {
  return (
    <>
      <FreshifyHeader />
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
      <GroceryDisplay />
    </>
  );
}

export default HomePage;