import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Next.js Full Stack authentication with mongoDB</h1>
      <ul className='my-8 text-xl'>
        <li>Signup <Link href='/signup' className='underline p-4 text-blue-700'>click here</Link></li>
        <li>Login <Link href='/login' className='underline p-4 text-blue-700'>click here</Link></li>
      </ul>
    </div>
  )
}

export default page