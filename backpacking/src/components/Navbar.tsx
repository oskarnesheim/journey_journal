import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../recoil/atoms";
import "./css/components.css";

const Navbar = () => {
  const [user, setUser] = useRecoilState(UserState);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="Navbar">
      <ul className="NavbarInline">
        <li className="homebutton">
          <Link to={"/home"}>
            <img src="../images/journey-journal-high-resolution-logo-color-on-transparent-background.png" />
          </Link>
        </li>
        <li className="hover:text-pink-500">
          <Link to={"/home"}>Home</Link>
        </li>
        {user && (
          <li className="hover:text-pink-500">
            <Link to={"/profile"}>Profile</Link>
          </li>
        )}
        <li className="hover:text-pink-500">
          <Link to={"/about"}>About us</Link>
        </li>
        {user && (
          <li>
            <p>{"Welcome back " + user?.firstname}</p>
          </li>
        )}
        <li className="hover:text-pink-500 absolute right-5">
          {user ? (
            <button
              onClick={() => {
                setUser(undefined);
                getAuth().signOut();
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link to={"/"}>Login</Link>
          )}
        </li>
        <li>
          <button
            className="absolute right-7 top-8 w-10"
            onClick={handleThemeSwitch}
          >
            {theme === "light" ? (
              <img src="../images/light-mode-icon.png" alt="Light" />
            ) : (
              <img src="../images/dark-mode-icon.png" alt="Dark" />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
