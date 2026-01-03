import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const response = axios.get(
        "https://dummyjson.com/products/category-list"
      );
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return categories;
};

export default useCategories;
