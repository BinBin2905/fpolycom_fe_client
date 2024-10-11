import { useEffect } from "react";
import Routers from "./router";

function App() {
  useEffect(() => {
    return () => {
      document.body.classList.remove("home-one");
    };
  }, []);

  return <Routers />;
}

export default App;
