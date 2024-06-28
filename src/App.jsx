import { Outlet } from "react-router-dom";
import Nav from "./context/Nav";

function App() {
  return (
    <>
      <Nav />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default App;
