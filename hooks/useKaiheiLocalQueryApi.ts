import { useEffect, useState } from "preact/hooks";

export interface Error {
  Syscall: string;
  Err: string;
}

export interface Plugin {
  Name: string;
  Version: string;
}

export interface ApiResponse {
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

export interface KaiheiStatus {
  Online: boolean;
  ApiResponse: ApiResponse | null;
}

export type useKaiheiLocalQueryApiResult = [
  {
    loading: boolean;
    error: string | null;
    result: KaiheiStatus;
  },
];

export const useKaiheiLocalQueryApi = (): useKaiheiLocalQueryApiResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<KaiheiStatus>({
    Online: false,
    ApiResponse: null,
  });

  const url = "https://kaihei-api.shmn7iii.net/api/local/query";

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const getKaiheiLocalQueryApi = async () => {
    setLoading(true);

    try {
      const response = await fetch(new URL(url), {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as ApiResponse;
      const status: KaiheiStatus = {
        Online: !!data.Host,
        ApiResponse: data,
      };

      // 不通時、レスが早すぎるのでちょっと待つ
      if (!status.Online) {
        await sleep(2700);
      }

      setResult(status);
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
