import { Status } from "../components/Status.tsx";
import { useKaiheiNetworkPingApi } from "../hooks/useKaiheiNetworkPingApi.ts";

export function DomainResolvable() {
  const [{ loading, error, result }] = useKaiheiNetworkPingApi();

  return (
    <div>
      <Status
        title="Network"
        badges={[result?.Result ? result?.FQDN : "Can't reached"]}
        state={loading
          ? "loading"
          : error || !result?.Result
          ? "failure"
          : "success"}
      />
    </div>
  );
}
