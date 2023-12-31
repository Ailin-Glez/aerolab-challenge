import "./Header.css";

import { useContext } from "react";

import { UserContext } from "../App";
import logo from "../assets/aerolab-logo.svg";
import coin from "../assets/coin.svg";
import errorIcon from "../assets/error.svg";
import header from "../assets/header.png";
import { User } from "../models/aerolab-models";
import Loader from "./Loader";

interface Props {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  onAddUserPoints: () => void;
}

const mockUser: User = {
  id: "1",
  name: "John Doe",
  points: 0,
  redeemHistory: [],
};

function Header({ user, isError, isLoading, onAddUserPoints }: Props) {
  const { userCoins } = useContext(UserContext);

  const showUserData = !isError && !isLoading;
  const finalUser = !user ? mockUser : user;

  return (
    <header>
      <nav className="nav-container">
        <img src={logo} alt="Aerolab logo" />
        {isLoading && <Loader size={0} position={"right"} />}
        {isError && (
          <div className="error-container">
            <img className="error" src={errorIcon} alt="error icon" />
            <span>There was an error getting the user info. No redeem can be made</span>
          </div>
        )}
        {showUserData && (
          <div className="user-details">
            <p>{finalUser.name}</p>
            <div className="badge">
              <span>{userCoins}</span>
              <img src={coin} alt="coin" />
            </div>
            <button className="add-coins" onClick={onAddUserPoints}>
              +
            </button>
          </div>
        )}
      </nav>
      <h1>Electronics</h1>
      <div className="img-container">
        <img className="header-img" src={header} alt="header" />
      </div>
    </header>
  );
}

export default Header;
