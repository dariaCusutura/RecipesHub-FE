import { Recipe } from "../hooks/useRecipes";
import { Text } from "@chakra-ui/react";

interface Props {
  recipe: Recipe;
}

const PostDate = ({ recipe }: Props) => {
  function timeSince(dateParam: Date | string): string {
    const date = new Date(dateParam);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let interval = seconds / 31536000; // 60 * 60 * 24 * 365
    //month day, year
    if (interval > 1) {
      return `on ${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
    }
    //month day
    interval = seconds / 2592000; // 60 * 60 * 24 * 30
    if (interval > 1) {
      return `on ${months[date.getMonth()]} ${date.getDate()}`;
    }
    //if in the same week: x days ago/
    //else month day
    interval = seconds / 86400; // 60 * 60 * 24
    if (interval > 1) {
      return Math.floor(interval) > 6
        ? `on ${months[date.getMonth()]} ${date.getDate()}`
        : `${Math.floor(interval)} ${
            Math.floor(interval) === 1 ? "day ago" : "days ago"
          }`;
    }
    //x hours ago
    interval = seconds / 3600; // 60 * 60
    if (interval > 1) {
      return `${Math.floor(interval)} ${
        Math.floor(interval) === 1 ? "hour ago" : "hours ago"
      }`;
    }
    //x minutes ago
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} ${
        Math.floor(interval) === 1 ? "minute ago" : "minutes ago"
      }`;
    }
    //x seconds ago
    return `${Math.floor(interval)} ${
      Math.floor(interval) === 1 ? "second ago" : "seconds ago"
    }`;
  }
  const displayDate = timeSince(recipe.date);

  return <Text>{displayDate}</Text>;
};

export default PostDate;
