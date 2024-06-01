import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { z } from "zod";

function useData<T extends z.ZodTypeAny>(path: string, schema: T) {
  const [data, setData] = useState<z.infer<typeof schema> | null>(null);

  useEffect(() => {
    const getData = async () => {
      const session = await fetchAuthSession();

      const response = await fetch("https://api.pto.football" + path, {
        method: "GET",
        headers: { Authorization: `Bearer ${session.tokens?.idToken}` },
      });

      if (response.status === 200) {
        const json = await response.json();
        setData(schema.parse(json));
      }
    };

    getData();
  }, [path]);

  return { data };
}

export { useData };
