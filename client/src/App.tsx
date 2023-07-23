import Navbar from "./components/Navbar";
import "./output.css";
import Homepage from "./pages/Homepage";
import { HeaderSearchProps } from "./utils/interface/app.interface";

function App() {
  const headerLinks: HeaderSearchProps["links"] = [
    {
      link: "/login",
      label: "Login",
    },
    {
      link: "/register",
      label: "Register",
    },
    // Add more link groups as needed
  ];

  return (
    <>
      <div>
        <Navbar links={headerLinks} />
        <Homepage />
      </div>
    </>
  );
}

export default App;
