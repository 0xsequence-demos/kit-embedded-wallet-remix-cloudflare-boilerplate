import { useAccount, useDisconnect } from "wagmi";
import TestSignMessage from "./TestSignMessage";
import TestVerifyMessage from "./TestVerifyMessage";
import TestSendTransaction from "./TestSendTransaction";
import { Missing } from "./Missing";
import { NetworkSwitchInputSelect } from "~/components/NetworkSwitchInputSelect";

import {
  Field,
  Group,
  Card,
  SegmentedInput,
  Input,
  Button,
  Svg,
  Label,
  Divider,
  ShowAddressWithDisconnect,
} from "boilerplate-design-system";

const MainConnected = () => {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  if (!address) {
    return <Missing>an address</Missing>;
  }
  if (!chain) {
    return <Missing>a chain</Missing>;
  }
  if (!chainId) {
    return <Missing>a chainId</Missing>;
  }

  return (
    <div className="flex flex-col gap-8">
      <Group title="User info">
        <Card>
          <ShowAddressWithDisconnect
            address={address}
            onDisconnect={() => disconnect()}
          />

          <NetworkSwitchInputSelect chainId={chain?.id?.toString()} />

          <Field name="test-payments">
            <Label>{chain.name} balance for test payments:</Label>
            <SegmentedInput subvariants={{ width: "full" }}>
              <Input
                type="text"
                variant="transparent"
                subvariants={{ width: "full" }}
              />
              <SegmentedInput.Segment>
                <Button
                  variant="tiny"
                  className="self-center flex-shrink-0"
                  onClick={() => alert("get test currency")}
                >
                  <Svg name="ExternalLink" width="16" />
                  Get test currency
                </Button>
              </SegmentedInput.Segment>
            </SegmentedInput>
          </Field>
        </Card>
      </Group>
      <Divider />
      <Group>
        <Card collapsable title="Sign message">
          <TestSignMessage />
        </Card>

        <Card collapsable title="Verify message">
          <TestVerifyMessage chainId={chainId} />
        </Card>

        <Card collapsable title="Send transaction">
          <TestSendTransaction chainId={chainId} />
        </Card>
      </Group>
    </div>
  );
};

export default MainConnected;
