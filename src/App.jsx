import { BrowserRouter, Route, Routes } from "react-router-dom"
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Protected from "./pages/Protected"

const App = () => {
  return (
    <BrowserRouter>
  <Routes >
    {/* PUBLİC */}
    <Route path="/" element={<Login />} />
    <Route path="kategori" element={<h1>KATEGORİ</h1>} />

{/* PRIVATE */}
<Route element={<Protected />} >
    <Route path="/home" element={<Feed />} />
    <Route path="/profil" element={<h1>PROFİL</h1>} />
    <Route path="/ayar" element={<h1>AYAR</h1>} />
    <Route path="/arkadaşlar" element={<h1>ARKADAŞLAR</h1>} />
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
