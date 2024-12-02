import { useOpenConnectModal } from "@0xsequence/kit";
import { Button, Card } from "boilerplate-design-system";

const Connector = () => {
  const { setOpenConnectModal } = useOpenConnectModal();

  return (
    <>
      <p>Not connected</p>
      <Card variant="none">
        <Button variant="primary" onClick={() => setOpenConnectModal(true)}>
          Connect
        </Button>
      </Card>
    </>
  );
};

export default Connector;
