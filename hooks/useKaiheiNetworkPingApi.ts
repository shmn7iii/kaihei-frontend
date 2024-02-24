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

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

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

      // 不通時、レスが早すぎるのでちょっと待つ
      if (!data.Result) {
        await sleep(3200);
      }

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
