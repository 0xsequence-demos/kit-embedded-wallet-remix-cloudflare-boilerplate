import { Button } from "boilerplate-design-system";
import { useDisconnect } from "wagmi";

const Disconnector = () => {
  const { disconnect } = useDisconnect();
  return (
    <div className="card">
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  );
};

export default Disconnector;
