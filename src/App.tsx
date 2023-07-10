/* eslint-disable @typescript-eslint/no-empty-function */
import "./App.css";

import { createContext, useEffect, useState } from "react";

import { toast, Toaster } from "sonner";

import { useQuery } from "@tanstack/react-query";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { User } from "./models/aerolab-models";
import { sendRequest } from "./services/aerolab-service";

interface IUserContext {
  userCoins: number;
  setCoins: (c: number) => void;
}

interface Points {
  "New Points": number;
  message: string;
}

export const UserContext = createContext<IUserContext>({ userCoins: 0, setCoins: () => {} });

function App() {
  const [userCoins, setUserCoins] = useState(0);

  const { data: user, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => sendRequest<User>({ endpoint: "user/me" }),
  });

  useEffect(() => {
    if (user?.points) {
      setUserCoins(user.points);
    }
  }, [user]);

  const redeemProduct = (cost: number) => {
    setUserCoins((prevCoins) => prevCoins - cost);
  };

  const addUserPoints = () => {
    sendRequest<Points>({
      endpoint: "user/points",
      method: "POST",
      body: JSON.stringify({
        amount: 1000,
      })
    }).then((points) => {
      setUserCoins(points["New Points"]);
      toast.success(points.message);
    });
  };

  return (
    <>
      <UserContext.Provider value={{ userCoins, setCoins: redeemProduct }}>
        <Toaster position="top-right" richColors closeButton />
        <Header user={user ? user : null} isError={isError} isLoading={isLoading} onAddUserPoints={addUserPoints} />
        <ProductList />
      </UserContext.Provider>
    </>
  );
}

export default App;
