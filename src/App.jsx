import "./App.css";
import LogIn from "./components/pages/LogIn";
import SignIn from "./components/pages/SignIn";
import { useDispatch, useSelector } from "react-redux";

function App() {
  // const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limit] = useState(12);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${limit * page}`
      );
      const data = await response.json();
      // setProductData(data.products);
      dispatch(setProductList(data.products));
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [page, limit, category]);

  return (
    <>
      <SignIn />
      <LogIn />
    </>
  );
}

export default App;
