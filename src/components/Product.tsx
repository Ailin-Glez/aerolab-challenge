import "./Product.css";

import { useContext } from "react";

import { toast } from "sonner";

import { UserContext } from "../App";
import cartBlue from "../assets/buy-blue.svg";
import cartWhite from "../assets/buy-white.svg";
import coin from "../assets/coin.svg";
import { ProductItem } from "../models/aerolab-models";
import { sendRequest } from "../services/aerolab-service";

interface Props {
  product: ProductItem;
}

function Product({ product }: Props) {
  const { _id, name, cost, category, img } = product;
  const { userCoins, setCoins } = useContext(UserContext);
  const cannotRedeem = cost > userCoins;

  const redeemProduct = () => {
    setCoins(cost);
    sendRequest<{ message: string }>({
      endpoint: "redeem",
      method: "POST",
      body: JSON.stringify({
        productId: _id,
      })
    }).then((d) => toast.success(d.message));
  };

  return (
    <div className={cannotRedeem ? "card card-no-redeem" : "card"}>
      {!cannotRedeem && (
        <div className="hover-div">
          <img src={cartWhite} className="cart-icon white" alt="cart logo" />
          <div>
            <span className="cost">{cost}</span>
            <img src={coin} alt="coin" />
          </div>
          <button className="redeem-btn" onClick={redeemProduct}>
            Redeem now
          </button>
        </div>
      )}
      {cannotRedeem ? (
        <div className="needed-coins">
          <span>You need {cost - userCoins}</span>
          <img className="small-coin" src={coin} alt="coin" />
        </div>
      ) : (
        <img src={cartBlue} className="cart-icon" alt="cart logo" />
      )}
      <img src={img.url} alt="product image" />
      <div className="divider-h"></div>
      <p className="category">{category}</p>
      <p className="product-name">{name}</p>
    </div>
  );
}

export default Product;
