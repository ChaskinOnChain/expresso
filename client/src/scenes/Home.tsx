import Navbar from "../components/Navbar";
import FirstHome from "./FirstHome";
import WorldHome from "./WorldHome";
import ConnectHome from "./ConnectHome";
import MoneyHome from "./MoneyHome";
import CollectableHome from "./CollectableHome";

function Home() {
  return (
    <>
      <Navbar />
      <FirstHome />
      <ConnectHome />
      <MoneyHome />
      <CollectableHome />
      <WorldHome />
    </>
  );
}

export default Home;
