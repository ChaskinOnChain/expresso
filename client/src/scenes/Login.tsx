import Form from "../components/Form";
import LoginBar from "../components/LoginBar";

function Login() {
  return (
    <div className="bg-slate-100 h-screen w-screen">
      <LoginBar />
      <div className="w-full flex justify-center">
        <Form isLogin={true} />
      </div>
    </div>
  );
}

export default Login;
