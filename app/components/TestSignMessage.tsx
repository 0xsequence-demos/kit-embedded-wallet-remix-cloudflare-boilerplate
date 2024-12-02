import { useEffect, useState, FormEvent } from "react";
import {
  Card,
  Action,
  Field,
  Label,
  Input,
  Button,
} from "boilerplate-design-system";
import { useSignMessage } from "wagmi";
const TestSignMessage = () => {
  const { isPending, data, signMessage: signMessageHook } = useSignMessage();
  // const [textCopied, setTextCopied] = useState<boolean>(false);

  function handleSignMessageIntent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = data.get("message") as string;
    if (!message) return;
    signMessageHook({ message });
  }

  // const copySignature = () => {
  //   if (!data) return;
  //   window.navigator.clipboard.writeText(data);
  //   setTextCopied(true);
  // };

  // useEffect(() => {
  //   if (textCopied)
  //     setTimeout(() => {
  //       setTextCopied(false);
  //     }, 2000);
  // }, [textCopied]);

  return (
    <>
      <Action intent="sign_message" onSubmit={handleSignMessageIntent}>
        <Field name="message">
          <Label>Message</Label>
          <Input subvariants={{ width: "full" }} />
        </Field>

        <Button
          type="submit"
          variant="primary"
          subvariants={{ flex: "start" }}
          disabled={isPending}
        >
          Sign
        </Button>
      </Action>

      {data ? <div className="break-words">{data}</div> : "Nothing signed yet"}
    </>
  );
};

export default TestSignMessage;
