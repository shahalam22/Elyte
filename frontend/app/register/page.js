"use client";
import { registerNewUser } from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const[condition, setCondition] = useState(false);

    const {push} = useRouter();

    const handleCondition = () => {
        setCondition(!condition);
        console.log("function called");
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        if(condition){
            const userData = {
                username: username,
                email: email,
                password: password
            }
            try {
                const response = await registerNewUser(userData);
                push('/');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }


  return (
    <div className='container font-sans flex flex-col justify-center items-center w-full'>
        <h1 className='text-4xl pt-12'>Create Account</h1>
        <p className='text-md pt-3 pb-10'>Please register account detail</p>

        <form className='w-3/4'>
            {/* <div className='w-full flex flex-col py-1'>
                <label htmlFor='firstname' className='py-1'>First Name</label>
                <input id='firstname' type='text' name='firstname' placeholder='First Name' className='border border-solid  border-gray-400 rounded-lg p-2'/>
            </div> */}
            <div className='w-full flex flex-col py-1'>
                <label htmlFor='username' className='py-1'>User Name</label>
                <input id='username' type='text' name='username' placeholder='User Name' className='border border-solid  border-gray-400 rounded-lg p-2' onChange={(e)=> setUsername(e.target.value)}/>
            </div>
            <div className='w-full flex flex-col py-1'>
                <label htmlFor='email' className='py-1'>Email</label>
                <input id='email' type='email' name='email' placeholder='Email' className='border border-solid  border-gray-400 rounded-lg p-2' onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className='w-full flex flex-col py-1'>
                <label htmlFor='password' className='py-1'>Password</label>
                <input id='password' type='password' name='password' placeholder='Password' className='border border-solid  border-gray-400 rounded-lg p-2' onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className='w-full flex mt-4 mb-1'>
                <input id='condition' type='checkbox' name='condition' className='border border-solid border-gray-400 rounded-lg p-2' onChange={handleCondition}/>
                <label htmlFor='condition' className='py-1 px-4'>I have read and agree with the <Link href={'#'} className='underline'>terms & condition</Link></label>
            </div>
            <div className='flex justify-between py-3'>
                <button className={`text-white bg-black px-10 py-2 rounded-md hover:bg-gray-200 hover:text-black ${condition? '':'cursor-not-allowed'}`} onClick={handleRegistration}>CREATE</button>
            </div>
        </form>
        <div className='text-white bg-black py-7 my-4 w-3/4 flex justify-center text-lg'>
            <p>Already have account? <Link href={"#"} className='underline text-gray-500 hover:text-gray-400'>Log in</Link></p>
        </div>
    </div>
  )
}
