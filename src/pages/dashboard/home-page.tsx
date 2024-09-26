import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "../../services/pto-api-service";

const HomePage = () => {
  const { data, error } = useQuery({
    queryKey: ["home"],
    queryFn: getHomePage,
  });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!data) {
    return <div>loading ...</div>;
  }

  return <div>{data.player.name}</div>;
};

export { HomePage };
