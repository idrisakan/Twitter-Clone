import { LuMessageCircle } from "react-icons/lu";
import { FaRetweet, FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { arrayUnion,arrayRemove, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";



const Buttons = ({ tweet }) => {
    // oturumu açık olan kullanıcı bu tweet'i likeladı mı?
    const isLiked = tweet.likes.includes(auth.currentUser.uid);
  //like durumunu tersine çevir
const toogleLike = () => {

  // güncellencek dökümanın referansı al
  const tweetRef = doc(db, "tweets", tweet.id)

  //likes dizisine oturumu açık olan kullanıcı  id sini ekledik 
  updateDoc(tweetRef, {
    likes: isLiked
     ? // eğer kullanıcı like'lamışsa likes dizisinden kullanıcının id'sini kaldır
     arrayRemove(auth.currentUser.uid)
     : // yoksa likes dizisine  kullanıcının id'sini ekle

      arrayUnion(auth.currentUser.uid),
  });
};


  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00a6ff43]">
      <LuMessageCircle />
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00ff6a71]">
      <FaRetweet />
      </div>
      <div 
      onClick={toogleLike}
      className="p-3 flex items-center gap-2 rounded-full cursor-pointer transition hover:bg-[#ff003343]">
        {isLiked ? <FaHeart className="text-red-500"/> : <FaRegHeart />  }

        {tweet.likes.length}
      
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00a6ffd0]">
      <CiShare2 />
      </div>
    </div>
  )
}

export default Buttons

      
     
    