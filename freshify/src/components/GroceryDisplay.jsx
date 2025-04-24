import { useState, useEffect } from "react";
import { useCart } from "./CartContext";

export default function GroceryDisplay() {
  const { addToCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(6);
  
  // All grocery items including new additions
  const allItems = [
    // Fruits and Vegetables
    { name: "Apple", icon: "🍎", price: "$1.99/lb" },
    { name: "Broccoli", icon: "🥦", price: "$2.49/lb" },
    { name: "Banana", icon: "🍌", price: "$0.59/lb" },
    { name: "Tomato", icon: "🍅", price: "$1.79/lb" },
    { name: "Avocado", icon: "🥑", price: "$1.99 each" },
    { name: "Orange", icon: "🍊", price: "$1.29/lb" },
    { name: "Carrot", icon: "🥕", price: "$1.49/lb" },
    { name: "Cucumber", icon: "🥒", price: "$0.99 each" },
    { name: "Potato", icon: "🥔", price: "$0.79/lb" },
    { name: "Onion", icon: "🧅", price: "$0.89/lb" },
    { name: "Garlic", icon: "🧄", price: "$1.29" },
    { name: "Pepper", icon: "🌶️", price: "$1.19 each" },
    { name: "Lemon", icon: "🍋", price: "$0.79 each" },
    
    // Dairy & Meat
    { name: "Cheese", icon: "🧀", price: "$3.99" },
    { name: "Milk", icon: "🥛", price: "$3.49" },
    { name: "Eggs", icon: "🥚", price: "$3.29" },
    { name: "Chicken", icon: "🍗", price: "$5.99/lb" },
    { name: "Beef", icon: "🥩", price: "$7.99/lb" },
    { name: "Salmon", icon: "🐟", price: "$12.99/lb" },

    // Grains & Staples
    { name: "Rice", icon: "🍚", price: "$4.99" },
    { name: "Cereal", icon: "🥣", price: "$3.79" },
    { name: "Pasta", icon: "🍝", price: "$1.49" },
    { name: "Flour", icon: "🌾", price: "$2.99" },

    // Beverages
    { name: "Coffee", icon: "☕", price: "$8.99" },
    { name: "Tea", icon: "🍵", price: "$4.29" },
    { name: "Honey", icon: "🍯", price: "$6.99" },

    // Household & Personal Care
    { name: "Shampoo", icon: "🧴", price: "$5.49" },
    { name: "Soap", icon: "🧼", price: "$2.99" },
    { name: "Toothpaste", icon: "🪥", price: "$1.99" },
    { name: "Tissue Paper", icon: "🧻", price: "$3.49" },
    { name: "Detergent", icon: "🧽", price: "$4.99" },
    
    // Dry Fruits & Snacks
    { name: "Almonds", icon: "🌰", price: "$9.99/lb" },
    { name: "Cashews", icon: "🥜", price: "$10.99/lb" },
    { name: "Raisins", icon: "🍇", price: "$5.49/lb" },
    { name: "Dates", icon: "🌴", price: "$6.99/lb" },

    // Utensils
    { name: "Cooking Pot", icon: "🍲", price: "$14.99" },
    { name: "Frying Pan", icon: "🍳", price: "$19.99" },
    { name: "Cutlery Set", icon: "🍴", price: "$12.99" },
    { name: "Chopping Board", icon: "🪓", price: "$8.99" },
    { name: "Glass Set", icon: "🍷", price: "$9.49" },

    // More items
    { name: "Yogurt", icon: "🥣", price: "$1.29" },
    { name: "Butter", icon: "🧈", price: "$3.99" },
  ];
  
  // Compute items to display based on itemsToShow state
  const displayItems = allItems.slice(0, itemsToShow);
  
  // Check if there are more items to show
  const hasMoreItems = itemsToShow < allItems.length;

  // Improved scroll event handler that keeps the grocery section visible once shown
  const handleScroll = () => {
    const categorySection = document.getElementById("categorySection");
    
    if (categorySection) {
      const categorySectionBottom = categorySection.getBoundingClientRect().bottom;
      
      if (categorySectionBottom < window.innerHeight * 0.75) {
        setVisible(true);
      }
    }
  };

  // Handle "See More" button click
  const handleSeeMore = () => {
    setItemsToShow(prev => Math.min(prev + 6, allItems.length));
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="grocerySection"
      className={`py-5 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        backgroundColor: "#e9f7ef",
        transition: "opacity 0.5s ease-in-out",
        minHeight: visible ? "auto" : "0"
      }}
    >
      <div className="container">
        <h2 className="text-center text-success mb-5">Grocery Display</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4 px-3">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="card text-center border-0 shadow-sm"
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
                <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                <h5 className="card-title mt-2">{item.name}</h5>
                <p className="text-success fw-bold">{item.price}</p>
                <button 
                  className="btn btn-outline-success btn-sm"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreItems && (
          <div className="text-center mt-4">
            <button 
              className="btn btn-success px-4"
              onClick={handleSeeMore}
            >
              See More items
            </button>
          </div>
        )}
      </div>
    </section>
  );
}