'use client'
import FeedPost from "./components/FeedPost";
import PostForm from "./components/PostForm";
import { useEffect, useState } from "react";
import getPublicPost from "@/util/getPublicPost";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addFeedPost , setLoading } from "@/lib/features/user/user-slice";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.userReducer)
  let { user, feedPost , loading } = store;
  const router = useRouter();


  const handleGetPost = async () => {
    const response = await getPublicPost();
    dispatch(addFeedPost(response));
    dispatch(setLoading(false));
  }

  const validateUser = () => {
    console.log(user);
    if (!user?.token) {
      router.push('/login')
    }
  }
  
  useEffect(()=>{
    setLoading(true)
    validateUser();
    handleGetPost();
  } ,[])

  return (
    <>

        <Navbar props={ {value : "home"} }/>

        { loading ?  
          (<Loading/>) : 
          (
            <div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border w-[60vw]">
                  <PostForm/>
  
                  { feedPost?.length ? feedPost?.toReversed().map((item,index) => 
                  <FeedPost key={index} props={item}/>) : "" }
              </div>
            </div>
          )
        }

    
    </>
  );
}
