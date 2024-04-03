import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

const useUserData = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [_id, setId] = useState();

  useEffect(() => {
    apiRecipe
      .get("/users/userData")
      .then((res) => {
        setEmail(res.data.email);
        setName(res.data.name);
        setIsAdmin(res.data.isAdmin);
        setId(res.data._id);
      })
      .catch((err) => {
        console.log("useUserData error:", err);
        if (err.response.data === "Access denied.")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      });
  }, []);
  return { email, name, isAdmin, _id };
};

export default useUserData;
