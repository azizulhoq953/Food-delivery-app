"use client"
// import { Link } from "react-router-dom"
import Image from "next/image"
import { signIn } from "next-auth/react";
import React, { useState } from 'react';
export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false)
   async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
       const Response = await fetch('/api/register',{
            method: 'POST',
            body : JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (Response.ok) {
            setUserCreated(true);
        }
        else {
            setError(true);
        }
        setCreatingUser(false);
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-bg-green-500 text-4xl">
            Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User Created.<br/> Now you can{' '}
                    <a className=" underline" href={'/login'}> Login &raquo;</a>
                </div>
            )}
            {error &&(
                <div className="my-4 text-center">
                    An Error has Occured. <br/>
                    please try again later
                </div>
            )} 
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)} /> 
                <input type="password" placeholder="password" value={password}
                   disabled={creatingUser}
                   onChange={ev => setPassword(ev.target.value)}/>
                <button className=" bg-green-500 submit" disabled={creatingUser}> 
                Register
                </button> 

                <div className="my-4 text-center text-gray-500">
                    or Login With Provider
                </div>
                <button 


                // add session without login yarn adaptar add
                onClick={() => signIn('google', {callbackUrl: '/'})}
                className=" flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24}/>
                    Login With google
                </button>

                <div className=" text-center my-4 text-gray-500 border-t pt-4">
                    Existing account? {' '}
                   <a className=" underline" href={'/login'} >Login here &raquo;</a>
                </div>
            </form>
        </section>
    );
}