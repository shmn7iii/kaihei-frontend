interface StatusPaneProps {
  state: "loading" | "failure" | "success";
  title: string;
  badges: string[];
}

const Loading = (props: StatusPaneProps) => {
  return (
    <>
      <div className="flex gap-1 items-center">
        <h2 className="text-xl font-bold">{props.title}</h2>
        <img
          src={"/images/icons/loading.svg"}
          width="25"
          alt={"loading badge"}
          className="animate-spin"
        />
      </div>
      <div className="my-6">
        <img
          src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1fae5.svg"
          width="100"
          alt="thumbnail"
          className="grayscale animate-pulse"
        />
      </div>
      <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded border border-gray-300">
        Loading...
      </span>
    </>
  );
};

const Failure = (props: StatusPaneProps) => {
  return (
    <>
      <div className="flex gap-1 items-center">
        <h2 className="text-xl font-bold">{props.title}</h2>
        <img
          src={"/images/icons/failure.svg"}
          width="25"
          alt={"failure badge"}
        />
      </div>
      <div className="my-6">
        <img
          src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f615.svg"
          width="100"
          alt="thumbnail"
        />
      </div>
      <div className="flex gap-2">
        {props.badges.map((badge) => {
          return (
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded border border-red-400">
              {badge}
            </span>
          );
        })}
      </div>
    </>
  );
};

const Success = (props: StatusPaneProps) => {
  return (
    <>
      <div className="flex gap-1 items-center">
        <h2 className="text-xl font-bold">{props.title}</h2>
        <img
          src={"/images/icons/success.svg"}
          width="25"
          alt={"success badge"}
        />
      </div>
      <div className="my-6">
        <img
          src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f601.svg"
          width="100"
          alt="thumbnail"
        />
      </div>
      <div className="flex gap-2">
        {props.badges.map((badge) => {
          return (
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded border border-green-400">
              {badge}
            </span>
          );
        })}
      </div>
    </>
  );
};

export function StatusPane(props: StatusPaneProps) {
  return (
    <div className="w-48 flex flex-col items-center">
      {props.state === "loading" && <Loading {...props} />}
      {props.state === "failure" && <Failure {...props} />}
      {props.state === "success" && <Success {...props} />}
    </div>
  );
}
