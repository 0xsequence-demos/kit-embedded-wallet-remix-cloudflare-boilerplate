import { useAccount, useDisconnect } from "wagmi";
import TestSignMessage from "./TestSignMessage";
import TestVerifyMessage from "./TestVerifyMessage";
import TestSendTransaction from "./TestSendTransaction";
import { Missing } from "./Missing";
import { ChainSwitchSelect } from "~/components/ChainSwitchSelect";

import {
  Field,
  Action,
  Group,
  Card,
  SegmentedInput,
  Input,
  Button,
  Svg,
  Label,
  Divider,
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
      <Group>
        <Group.Title>User info</Group.Title>
        <Card>
          <Action intent="user_info" className="flex flex-col gap-2">
            <Field name="wallet-address">
              <Label>Wallet address:</Label>
              <SegmentedInput subvariants={{ width: "full" }}>
                <SegmentedInput.Segment subvariants={{ pointer: "none" }}>
                  <Svg name="Wallet" width="20" />
                </SegmentedInput.Segment>

                <Input
                  type="text"
                  defaultValue={address}
                  variant="transparent"
                  subvariants={{ width: "full" }}
                />

                <SegmentedInput.Segment>
                  <Button
                    variant="tiny"
                    className="self-center"
                    onClick={() => disconnect()}
                  >
                    <Svg name="Signout" width="16" />
                    Disconnect
                  </Button>
                </SegmentedInput.Segment>
              </SegmentedInput>
            </Field>

            <Field name="network">
              <Label>Network:</Label>
              <ChainSwitchSelect chainId={chain?.id?.toString()} />
            </Field>
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
          </Action>
        </Card>
      </Group>
      <Divider />
      <Group>
        <Card.Collapsable>
          <Card.Summary>Sign message</Card.Summary>
          <Card.Body>
            <TestSignMessage />
          </Card.Body>
        </Card.Collapsable>

        <Card.Collapsable>
          <Card.Summary>Sign message</Card.Summary>
          <Card.Body>
            <TestVerifyMessage chainId={chainId} />
          </Card.Body>
        </Card.Collapsable>
        <TestSendTransaction chainId={chainId} />
      </Group>
    </div>
  );
};

export default MainConnected;
