import { ToastContainer } from "react-toastify";
import Routers from "router";
import "./assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Routers />
      <ToastContainer position="top-center"></ToastContainer>
      {/* test */}
    </>
  );
}

export default App;
