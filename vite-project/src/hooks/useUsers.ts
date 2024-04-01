import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";
import { AxiosResponse } from "axios";

export interface User  {
    _id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    apiRecipe
      .get("/users")
      .then((res) => {
        if(res !== undefined && (res as AxiosResponse).status === 200)
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("useUsers error:", err);
        if (err.response.data === "Access denied.")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      });
  }, []);
  return users;
};
export default useUsers;
