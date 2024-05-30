import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { v4 } from "uuid";
import { toast } from "react-toastify";

// dosyayı storage yükleyen fonksiyon
 const upload = async (file)=> {
    //1 dosya resim değilse fonksiyonu durdur
    //dosya ismi image kelimesi ile başlamıyorsa kontrolü yaptık
    if (!file?.type.startsWith("image") || !file) return null;
  
   // 2 dosyanın yükleneceğinin konumun referansını al
    const imageRef = ref(storage, v4() + file.name);
  
    try {
      // 3 refaransını oluşturduğumuz konuma dosyayı yükle
   await uploadBytes(imageRef, file);
  
   // 4 yüklenen dosyanın url sini al ve return et
   return await  getDownloadURL(imageRef);
    } catch(err) {
      toast.error("Resim yüklenirken bir sorun oluştu")
    }
   
  };
  export default upload; 