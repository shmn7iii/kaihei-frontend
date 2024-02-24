import { useEffect, useState } from "preact/hooks";

export type useKaiheiNetworkPingApiResult = [
  {
    loading: boolean;
    error: string | null;
    result: boolean;
  },
];

export const useKaiheiNetworkPingApi = (): useKaiheiNetworkPingApiResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState(false);

  const url = "https://kaihei-api.shmn7iii.net/api/network/ping";

  const getKaiheiNetworkPingApi = async () => {
    setLoading(true);

    try {
      const response = await fetch(new URL(url), {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setResult(data.Result);
    } catch (err) {
      setError("Error occurred: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKaiheiNetworkPingApi();
  }, []);

  return [{ loading, error, result }];
};
