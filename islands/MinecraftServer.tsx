import { StatusPane } from "../components/StatusPane.tsx";
import { useKaiheiLocalQueryApi } from "../hooks/useKaiheiLocalQueryApi.ts";

export function MinecraftServer() {
  const [{ loading, error, result }] = useKaiheiLocalQueryApi();

  return (
    <div>
      <StatusPane
        title="Server"
        badges={result?.Err
          ? ["Server down"]
          : [result?.Version || "Unknown version"]}
        state={loading
          ? "loading"
          : error || result?.Err
          ? "failure"
          : "success"}
      />
    </div>
  );
}
