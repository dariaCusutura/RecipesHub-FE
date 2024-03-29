import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

const useUserData = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    apiRecipe
      .get("/userData")
      .then((res) => {
        setEmail(res.data.email);
        setName(res.data.name);
        setIsAdmin(res.data.isAdmin);
      })
      .catch((err) => {
        console.log("useUserData error:", err);
        if (err.response.data === "Access denied.")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      });
  }, []);
  return { email, name, isAdmin };
};

export default useUserData;
