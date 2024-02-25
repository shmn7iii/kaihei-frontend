import { StatusPane } from "../components/StatusPane.tsx";

export function Browser() {
  return (
    <div>
      <StatusPane
        title="You"
        badges={["Fine"]}
        state={"success"}
      />
    </div>
  );
}
