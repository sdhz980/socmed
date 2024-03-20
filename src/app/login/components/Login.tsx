'use client'
import userLogin from '@/util/userLogin';
import { addUser, setLoading, setLoginSwitch } from '@/lib/features/user/user-slice';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup';

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const validation = Yup.object().shape({
        username: Yup.string().required("please input yout username"),
        password: Yup.string().required("please input yout password")
      })
    
      const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema : validation,
        onSubmit: value => {
                dispatch(setLoading(true));
                userLogin(value)
                    .then((val)=> {
                        dispatch(setLoading(false));
                        console.log(val);
                        if (val == 'invalid login' || val == 'invalid password') {
                            alert(`error : ${val}`)
                            router.push('/login')
                            return;}
                        dispatch(addUser(val));
                        alert('login success you will redirect to home page user')
                        setTimeout(() => router.push('/'),500);
                    });
        }
      })

  return (
    <section className="bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                Flowbite    
            </a>
            
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login to your account
                    </h1>
                    
                    <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your username" />
                            <p className="text-sm font-light text-gray-500 dark:text-red-400"> {formik.errors.username} </p>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <p className="text-sm font-light text-gray-500 dark:text-red-400"> {formik.errors.password} </p>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account? <a onClick={()=> dispatch(setLoginSwitch(false))} className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500">Register here</a>
                        </p>
                    </form>

                </div>
            </div>
        
        </div>
    </section>
  )
}

export default Login
