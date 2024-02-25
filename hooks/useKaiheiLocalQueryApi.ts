import { useEffect, useState } from "preact/hooks";

export interface Error {
  Syscall: string;
  Err: string;
}

export interface Plugin {
  Name: string;
  Version: string;
}

export interface Response {
  MOTD: string;
  Version: string;
  ServerVersion: string;
  Plugins: Plugin[];
  Map: string;
  OnlinePlayers: number;
  MaxPlayers: number;
  Port: number;
  Host: string;
  Err: Error | string;
}

export type useKaiheiLocalQueryApiResult = [
  {
    loading: boolean;
    error: string | null;
    result: Response | null;
  },
];

export const useKaiheiLocalQueryApi = (): useKaiheiLocalQueryApiResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Response | null>(null);

  const url = "https://kaihei-api.shmn7iii.net/api/local/query";

  const getKaiheiLocalQueryApi = async () => {
    setLoading(true);

    try {
      const response = await fetch(new URL(url), {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as Response;

      setResult(data);
    } catch (err) {
      setError("Error occurred: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKaiheiLocalQueryApi();
  }, []);

  return [{ loading, error, result }];
};
