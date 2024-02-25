import { StatusPane } from "../components/StatusPane.tsx";
import { useKaiheiNetworkPingApi } from "../hooks/useKaiheiNetworkPingApi.ts";

export function DomainResolvable() {
  const [{ loading, error, result }] = useKaiheiNetworkPingApi();

  return (
    <div>
      <StatusPane
        title="Network"
        badges={[result?.Result ? result?.FQDN : "Unreachable"]}
        state={loading
          ? "loading"
          : error || !result?.Result
          ? "failure"
          : "success"}
      />
    </div>
  );
}
