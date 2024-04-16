import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";
import { AxiosResponse } from "axios";

export interface User {
  _id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Props {
  page: number;
}

const useUsers = ({page}: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState();

  useEffect(() => {
    apiRecipe
      .get(`/users?page=${page}`)
      .then((res) => {
        if (res !== undefined && (res as AxiosResponse).status === 200) {
          setUsers(res.data.users);
          setTotalUsersCount(res.data.totalUsersCount);
        }
      })
      .catch((err) => {
        console.log("useUsers error:", err);
        if (err.response.data === "Access denied.")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      });
  }, []);
  return { users, totalUsersCount };
};
export default useUsers;
