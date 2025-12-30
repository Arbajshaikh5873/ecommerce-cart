import axios from "axios";
import React, { useEffect, useState } from "react";

function useCategory() {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      const data = await response.data;
      setCategoryList(data);
    } catch (error) {
      console.error("error inside useCategory hook");
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  if (categoryList) {
    return categoryList;
  }
}

export default useCategory;
