import logo from "../assets/images/logoDarkTrans.png";

function Footer() {
  return (
    <div className="relative w-full h-24 mt-4 md:mt-0 bg-gradient-to-br from-yellow-500 to-purple-500 text-white text-center flex flex-col items-center">
      <img className="h-20 w-20 -mb-5 -mt-3" src={logo} alt="logo" />
      <h2 className="text-sm font-bold">Expresso</h2>
      <h4 className="text-[10px] md:text-sm">
        The world's first blog platform incorporating native digital
        collectibles and ETH donations
      </h4>
      <div className="absolute bottom-1 right-5 text-[10px] md:text-sm">
        © 2023
      </div>
    </div>
  );
}

export default Footer;
