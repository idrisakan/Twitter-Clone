import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "./../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  //form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      //kaydol modundaysa hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız başarıyla oluşturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error("Bir sorun oluştu" + err.code));
    } else {
      //giriş modundaysa hesap giriş yap
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız giriş yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          //eger giriş bilgileri yanlışsa
          if (err.code === "auth/invalid-credential") {
            // hata stateini true ya çek
            setIsError(true);
          }
          toast.error("Bir sorun oluştu" + err.code);
        });
    }
  };

  // şifre unuttuma basılınca
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() =>
        toast.info(
          "Şifre sıfırlama e postası gönderildi mailinizi kontrol ediniz"
        )
      )
      .catch((err) => toast.error("Bir hata oluştu" + err.code));
  };
// google ile giriş yap 
const handleGoogle = () => {
    signInWithPopup(auth,provider)
    .then(() => {
        toast.success("Hesaba giriş yapıldı");
        navigate("/home");
      })
      .catch((err) => toast.error("Bir sorun oluştu" + err.code));
}

  return (
    <div className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" />
        </div>

        <h1 className="text-lg font-bold text-center">Twitter'a giriş yap</h1>
        <button onClick={handleGoogle}
         className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap ">
          <img className="h-[20px]" src="/google-logo.svg" alt="" />
          Google ile Giriş Yap
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
          />

          <label className="mt-5">Şifre</label>

          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
          />
          <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300 ">
            {isSignUp ? "Kaydolun" : "Giriş Yapın"}
          </button>
        </form>
        <p className="mt-5">
          <span className="text-gray-500">
            {isSignUp ? "Hesabınız varsa" : "Heasbınız yoksa"}
          </span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="ms-2 cursor-pointer text-blue-500"
          >
            {isSignUp ? "Giriş Yapın" : "Kaydolun"}
          </span>
        </p>
        {isError && (
          <button onClick={handleReset} className="text-red-500">
            Şifrenimizi unuttunuz ?{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
