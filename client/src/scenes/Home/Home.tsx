import NavbarHome from "../../components/NavbarHome";
import FirstHome from "./FirstHome";
import WorldHome from "./WorldHome";
import ConnectHome from "./ConnectHome";
import MoneyHome from "./MoneyHome";
import CollectableHome from "./CollectableHome";

function Home() {
  return (
    <>
      <NavbarHome />
      <FirstHome />
      <ConnectHome />
      <MoneyHome />
      <CollectableHome />
      <WorldHome />
    </>
  );
}

export default Home;
