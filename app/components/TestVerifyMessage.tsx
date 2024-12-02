import { Box, Card, Spinner, Text } from "@0xsequence/design-system";
import { Action, Button, Field, Input, Label } from "boilerplate-design-system";
import { useState } from "react";
import { Signature } from "viem";
import { usePublicClient } from "wagmi";

const TestVerifyMessage = (props: { chainId: number }) => {
  const { chainId } = props;
  const publicClient = usePublicClient({ chainId });

  const [isValidSignature, setIsValidSignature] = useState<
    boolean | "idle" | "pending"
  >("idle");

  function handleVerifyMessageIntent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // abstract all this logic

    /** Get the data from the form fields */
    const formdata = new FormData(event.currentTarget);

    /** Get the value for the relevant fields */
    const address = formdata.get("address") as `0x${string}`;
    const message = formdata.get("message") as string;
    const signature = formdata.get("signature") as
      | `0x${string}`
      | Uint8Array
      | Signature;

    /** Stop if a value is missing */
    if (!(address && message && signature)) return;

    /** Verify the message */
    try {
      // setValidatingSignature(true);
      setIsValidSignature("pending");
      publicClient!
        .verifyMessage({
          address,
          message,
          signature,
        })
        .then((isValid) => {
          setIsValidSignature(isValid);
        });
    } catch (error) {
      console.error(error);
      setIsValidSignature("idle");
    }
  }

  return (
    <>
      <Action intent="verify_message" onSubmit={handleVerifyMessageIntent}>
        <Field name="address">
          <Label>Address</Label>
          <Input />
        </Field>

        <Field name="message">
          <Label>Message</Label>
          <Input />
        </Field>

        <Field name="signature">
          <Label>Signature</Label>
          <Input />
        </Field>

        <Button type="submit" variant="primary" subvariants={{ flex: "start" }}>
          Verify
        </Button>
      </Action>

      <Card>
        {isValidSignature === "idle" ? (
          <span>Nothing verified yet</span>
        ) : isValidSignature === "pending" ? (
          <span>
            <Spinner size="sm" />
            Checking...
          </span>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            gap="8"
            style={{ maxWidth: "700px" }}
          >
            <Text className="break-word">
              Signature is: {isValidSignature ? "Valid" : "Invalid"}
            </Text>
          </Box>
        )}
      </Card>
    </>
  );
};

export default TestVerifyMessage;
