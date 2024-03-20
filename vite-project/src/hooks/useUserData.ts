import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

const useUserData = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    apiRecipe
      .get("/userData")
      .then((res) => {setEmail(res.data.email); setName(res.data.name)})
      .catch((err) => console.log(err, "eroare email"));
  }, []);
  return {email, name};

};

export default useUserData;