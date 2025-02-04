import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Navigate, Outlet} from "react-router-dom"
import { auth } from "../../firebase/config"


const Protected = () => {
    const [isAuth, setIsAuth] = useState();
useEffect(() => {
        // onAuthStateChanged > kullanıcı oturumundaki değişimi izler
    onAuthStateChanged(auth, (user) => {
        // eğerki kullanıcı varsa yetkisini true'ya çek
      // oturumu kapalıysa yetkisiyi false'a çek
        setIsAuth(user ? true : false) ;
    });
},[])
 // eğer yetkisi yoksa
if (isAuth === false)  {
  return <Navigate to="/"/>
}
   // yetkisi varsa alt route'daki sayfayı göster

  return (
    <Outlet />
  )
}

export default Protected
