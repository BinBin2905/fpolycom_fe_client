import ReactDOM from "react-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
AOS.init();
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
