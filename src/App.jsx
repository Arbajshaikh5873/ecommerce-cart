import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContent from "./components/AppContent";
import store from "./redux/store/store";

// ==================== MAIN APP ====================

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
