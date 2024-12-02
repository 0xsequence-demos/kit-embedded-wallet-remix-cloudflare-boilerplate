import { useAccount } from "wagmi";
import Connector from "~/components/Connector";
import MainConnected from "~/components/MainConnected";
import { SequenceBoilerplate } from "boilerplate-design-system";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/kit-embedded-wallet-remix-cloudflare-boilerplate"
      name="Sequence Kit Starter - Remix Cloudflare"
      description="Embedded Wallet"
    >
      {isConnected ? <MainConnected /> : <Connector />}
    </SequenceBoilerplate>
  );
};

export default Home;
