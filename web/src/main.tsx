import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./styles/main.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
