import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

const useEmail = () => {
  const [email, setEmail] = useState();
  useEffect(() => {
    apiRecipe
      .get("/userEmail")
      .then((res) => setEmail(res.data))
      .catch((err) => console.log(err, "eroare email"));
  }, []);
  return email;

};

export default useEmail;