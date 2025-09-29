import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center  w-full text-[#302F2C]'>
      <div>
        <Image
          src="/image_login.png"
          alt="image login"
          width={1600}
          height={400}
          priority
          className='h-screen  object-cover hidden md:block'
        />
      </div>

      <div className='bg-[#F6F1E9] flex flex-col justify-center items-center  h-screen px-4'>
        <Image
          src="/logo.png"
          alt="logo kumo-nino"
          width={150}
          height={150}
        />
        <h1 className='text-8xl'>Sing in </h1>
        <h2 className='text-2xl'>To continue for Kumi-nino</h2>

        <div className='border border-black/10 p-8 rounded-lg mt-6 
                '>
          <form className='flex flex-col gap-4'>
            <input
              type="email"
              placeholder='Email'
              className='border border-black/10 p-3 rounded-lg w-96'
              required
            />
            <input
              type="password"
              placeholder='Password'
              className='border border-black/10 p-3 rounded-lg w-96'
              required
            />
            <Link href="/dashboard" type="submit" className='bg-[#302F2C] text-[#7FA087] p-3 rounded-lg mt-4 hover:bg-[#1C1B19] transition-colors'>
              Sing In
            </Link>


          </form>
          <p className='mt-4 text-sm'>
            No registered yet?  <a href="#" className='text-[#7FA087] hover:underline'>create an account</a>
          </p>
          <form />

        </div>


      </div>
    </div>
  );
};

export default LoginPage;