import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";

const HomePage = () => {
  const { data, error } = useQuery({
    queryKey: ["home"],
    queryFn: getHomePage,
  });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <p>{data.player.name}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex diam,
        sollicitudin sed interdum eu, condimentum quis sapien. Morbi pharetra
        porta nulla, eu mattis massa tristique a. Donec ultrices augue non est
        semper, in ultrices sem porta. Aliquam sed augue fermentum odio
        condimentum tincidunt sed vitae elit. Pellentesque at diam libero. Nulla
        eu leo eros. Sed vitae diam augue. Etiam ut velit nisl.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex diam,
        sollicitudin sed interdum eu, condimentum quis sapien. Morbi pharetra
        porta nulla, eu mattis massa tristique a. Donec ultrices augue non est
        semper, in ultrices sem porta. Aliquam sed augue fermentum odio
        condimentum tincidunt sed vitae elit. Pellentesque at diam libero. Nulla
        eu leo eros. Sed vitae diam augue. Etiam ut velit nisl.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex diam,
        sollicitudin sed interdum eu, condimentum quis sapien. Morbi pharetra
        porta nulla, eu mattis massa tristique a. Donec ultrices augue non est
        semper, in ultrices sem porta. Aliquam sed augue fermentum odio
        condimentum tincidunt sed vitae elit. Pellentesque at diam libero. Nulla
        eu leo eros. Sed vitae diam augue. Etiam ut velit nisl.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex diam,
        sollicitudin sed interdum eu, condimentum quis sapien. Morbi pharetra
        porta nulla, eu mattis massa tristique a. Donec ultrices augue non est
        semper, in ultrices sem porta. Aliquam sed augue fermentum odio
        condimentum tincidunt sed vitae elit. Pellentesque at diam libero. Nulla
        eu leo eros. Sed vitae diam augue. Etiam ut velit nisl.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex diam,
        sollicitudin sed interdum eu, condimentum quis sapien. Morbi pharetra
        porta nulla, eu mattis massa tristique a. Donec ultrices augue non est
        semper, in ultrices sem porta. Aliquam sed augue fermentum odio
        condimentum tincidunt sed vitae elit. Pellentesque at diam libero. Nulla
        eu leo eros. Sed vitae diam augue. Etiam ut velit nisl.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex diam,
        sollicitudin sed interdum eu, condimentum quis sapien. Morbi pharetra
        porta nulla, eu mattis massa tristique a. Donec ultrices augue non est
        semper, in ultrices sem porta. Aliquam sed augue fermentum odio
        condimentum tincidunt sed vitae elit. Pellentesque at diam libero. Nulla
        eu leo eros. Sed vitae diam augue. Etiam ut velit nisl.
      </p>
    </div>
  );
};

export { HomePage };
