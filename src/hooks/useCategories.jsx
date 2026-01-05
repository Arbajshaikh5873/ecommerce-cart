import { useEffect, useState } from "react";
import axios from "axios";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      const data = await response.data;
      setCategories(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return categories;
};

export default useCategories;
