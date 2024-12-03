import { Form, Button, InputText, Card } from "boilerplate-design-system";
import { useSignMessage } from "wagmi";
import { FormHandler } from "node_modules/boilerplate-design-system/dist/components/action/Form";
import { SignableMessage } from "viem";

const TestSignMessage = () => {
  const { isPending, data, signMessage: signMessageHook } = useSignMessage();
  // const [textCopied, setTextCopied] = useState<boolean>(false);

  const handleSignMessage: FormHandler = (event, data) => {
    const { message } = data as { message: SignableMessage };
    if (!message) return;
    signMessageHook({ message });

    return [data, true];
  };

  // useAsyncStoreData("messageSignature", data);

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
      <Form onAction={handleSignMessage}>
        <InputText name="message" />

        <Button
          type="submit"
          variant="primary"
          subvariants={{ flex: "start" }}
          disabled={isPending}
        >
          Sign
        </Button>
      </Form>

      <Card className="break-word">
        {data ? <>{data}</> : "Nothing signed yet"}
      </Card>
    </>
  );
};

export default TestSignMessage;
