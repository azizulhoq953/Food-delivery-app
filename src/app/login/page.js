'use client';
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  useEffect(() => {
    console.log('Session data:', session); // Debug: check session data
  }, [session]);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', { email, password, callbackUrl: '/' });

    setLoginInProgress(false);
  }

  if (session) {
    return (
      <section className="mt-8">
        <h1 className="text-center text-green-500 text-4xl mb-4">
          Welcome, {session.user.name || session.user.email}
        </h1>
        <p className="text-center">You are logged in.</p>
        {/* Add more user profile info here if needed */}
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-green-500 text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email}
               disabled={loginInProgress}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
               disabled={loginInProgress}
               onChange={ev => setPassword(ev.target.value)} />
        <button disabled={loginInProgress} type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })}
                className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={'Google'} width={24} height={24} />
          Login with Google
        </button>
      </form>
    </section>
  );
}

