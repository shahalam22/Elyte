"use client";

import { loginUser } from '@/utils/api';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {push} = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
            const userData = {
                email: email,
                password: password
            }
            const response = await loginUser(userData);
            push('/');
        } catch (error){
            console.error('Error:', error);
        }
    };


  return (
    <div className='container font-sans flex flex-col justify-center items-center w-full'>
        <h1 className='text-4xl pt-12'>Login Account</h1>
        <p className='text-md pt-3 pb-10'>Please login account detail</p>

        <form className='w-3/4'>
            <div className='w-full flex flex-col py-1'>
                <label htmlFor='email' className='py-1'>Email</label>
                <input id='email' type='email' name='email' placeholder='Email' className='border border-solid  border-gray-400 rounded-lg p-2' onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className='w-full flex flex-col py-1'>
                <label htmlFor='password' className='py-1'>Password</label>
                <input id='password' type='password' name='password' placeholder='Password' className='border border-solid  border-gray-400 rounded-lg p-2' onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className='flex justify-between py-3'>
                <button className='text-white bg-black px-10 py-2 rounded-lg hover:bg-gray-200 hover:text-black' onClick={handleSubmit}>LOG IN</button>
                <Link href={'#'} className='underline text-md my-auto hover:text-gray-500'>Forget your password?</Link>
            </div>
        </form>
        <div className='text-white bg-black py-7 my-4 w-3/4 flex justify-center text-lg'>
            <p>Don't have account? <Link href={"/register"} className='underline text-gray-500 hover:text-gray-400'>Create Account</Link></p>
        </div>
    </div>
  )
}
