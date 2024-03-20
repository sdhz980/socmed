'use client'
import { useFormik } from 'formik'
import React from 'react'
import { postPublicPost } from '../util/postPublicPost'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { addFeedPost, setLoading } from '@/lib/features/user/user-slice'
import getPublicPost from '../util/getPublicPost'

const PostForm = () => {
  const  { user } = useSelector((state : RootState) => state.userReducer)
  const dispatch = useDispatch();

  const validation = Yup.object().shape({
    postForm: Yup.string().max(300)
  })

  const formik = useFormik({
    initialValues: {
      postForm: ''
    },
    validationSchema : validation,
    onSubmit: value => {}
  })

  const handlePostFunction = async () => {
    try {
      await postPublicPost({
        name: user.name,
        username: user.username,
        profileImage: user.profileImage,
        content : {
          imageUrl: '',
          text: formik.values.postForm,
        }
      });
    }
    catch(err) {}
  }
  
  const handleSubmitForm = () => {
    dispatch(setLoading(true))
    formik.setFieldValue("postForm","");
    handlePostFunction().then(() => {
      getPublicPost().then((val:any) => {
        dispatch(addFeedPost(val));
        dispatch(setLoading(false));
      })
    });
  }

  return (
    <>
    
                <div className="heading text-center font-bold mt-6 text-2xl text-white">Make your own Post!</div>
                <div className="editor mx-auto flex flex-col text-gray-800 p-4">
                    <p className='text-white ml-4 mb-4 text-sm' >Apa yang sedang pikirkan</p>
                    <textarea value={formik.values.postForm} maxLength={300} onChange={formik.handleChange} id='postForm' name='postForm' className="description text-white bg-transparent sec p-3 h-60 border border-gray-300 rounded-xl outline-none" placeholder="Describe everything about this post here"></textarea>

                        <div className="icons flex text-gray-500 m-2">
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            <div className="count ml-auto text-gray-400 text-xs font-semibold">{(formik.values.postForm).length}/300</div>
                        </div>

                        <div className="buttons flex">
                            <div onClick={formik.handleReset} className="btn border-2 border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto rounded-full">Cancel</div>
                            <div onClick={handleSubmitForm} className="btn border-2 border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-transparent rounded-full">Post</div>
                        </div>
                </div>
 
    </>
  )
}

export default PostForm