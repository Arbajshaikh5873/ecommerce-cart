import { useContext, useEffect, useState } from "react";

import Navbar from "../Navbar";
import ProductCard from "../ProductCard";

function Home() {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar
          search={search}
          setSearch={setSearch}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <ProductCard search={search} priceRange={priceRange} />
      </div>

      {/* {!currUser && authStatus != "signUp" && <SignIn />} */}

      {/* {authStatus == "signUp" && <SignUp />} */}
    </div>
  );
}

export default Home;
