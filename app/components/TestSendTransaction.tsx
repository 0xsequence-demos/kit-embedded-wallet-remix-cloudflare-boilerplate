import { Box, Text } from "@0xsequence/design-system";
import { useEffect, useState } from "react";
import { Chain } from "viem";
import { useSendTransaction, useWalletClient } from "wagmi";
import chains from "~/constants";
import CardButton from "./CardButton";
import ErrorToast from "./ErrorToast";
import { Card, Form } from "boilerplate-design-system";

const TestSendTransaction = (props: { chainId: number }) => {
  const { data: walletClient } = useWalletClient();
  const { chainId } = props;
  const [network, setNetwork] = useState<Chain | null>(null);
  const {
    data: txnData,
    sendTransaction,
    isPending: isPendingSendTxn,
    error,
    reset,
  } = useSendTransaction();
  const [lastTransaction, setLastTransaction] = useState<string | null>(null);

  useEffect(() => {
    if (txnData) {
      setLastTransaction(txnData);
    }
    if (error) console.error(error);
  }, [txnData, error]);

  useEffect(() => {
    const chainResult = chains.find((chain) => chain.id === chainId);
    if (chainResult) {
      setNetwork(chainResult);
    }
  }, [chainId]);

  const handleSendTransaction = async () => {
    const [account] = await walletClient!.getAddresses();
    sendTransaction({ to: account, value: BigInt(0), gas: null });
  };

  return (
    <>
      <Form onAction={handleSendTransaction}>
        <button type="submit">send transaction</button>
      </Form>
      {/* <CardButton
        title="Send transaction"
        description="Send a transaction with your wallet"
        isPending={isPendingSendTxn}
        onClick={runSendTransaction}
      /> */}
      {lastTransaction && (
        <Card>
          <span>Last transaction hash: {lastTransaction}</span>

          <a
            href={`${network?.blockExplorers?.default?.url}/tx/${lastTransaction}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            Click to view on {network?.name}
          </a>
        </Card>
      )}
      {error &&
        alert(
          error.message
        )
        // <ErrorToast message={error?.message} onClose={reset} duration={7000} />
      }
    </>
  );
};

export default TestSendTransaction;
