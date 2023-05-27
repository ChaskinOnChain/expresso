import logoLight from "../assets/images/LogoLightTrans.png";

function LoginBar() {
  return (
    <div className="h-20 w-full bg-white flex items-center justify-center">
      <div className="flex items-center">
        <img className="h-20 w-20" src={logoLight} alt="logo" />
        <h1 className="text-3xl text-sky-500 font-bold">Expresso</h1>
      </div>
    </div>
  );
}

export default LoginBar;
