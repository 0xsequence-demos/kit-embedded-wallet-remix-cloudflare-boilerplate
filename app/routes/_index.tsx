import { useAccount } from "wagmi";
import Connector from "~/components/Connector";
import MainConnected from "~/components/MainConnected";
import { Footer } from "~/components/Footer";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <div>
      <h1>Sequence Kit Starter - Remix Cloudflare</h1>
      <h2 className="homepage__marginBtNormal">Embedded Wallet</h2>
      {isConnected ? <MainConnected /> : <Connector />}
      <Footer />
    </div>
  );
};

export default Home;
