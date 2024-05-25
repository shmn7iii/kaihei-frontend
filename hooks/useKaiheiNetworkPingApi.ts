import { useEffect, useState } from "preact/hooks";

export interface Response {
  Result: boolean;
  FQDN: string;
}

export type useKaiheiNetworkPingApiResult = [
  {
    loading: boolean;
    error: string | null;
    result: Response | null;
  },
];

export const useKaiheiNetworkPingApi = (): useKaiheiNetworkPingApiResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Response | null>(null);

  const getKaiheiNetworkPingApi = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "./api/network/ping",
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = (await response.json()) as Response;

      setResult(data);
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
