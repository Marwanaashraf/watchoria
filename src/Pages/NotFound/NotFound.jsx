import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] space-y-3'>
      <h1 className='text-9xl text-main font-bold'>404</h1>
      <h3 className='text-4xl  font-semibold'>Not Found Page</h3>
      <button className='bg-red-500 px-4 py-3 rounded-lg'>
        <Link to="/">
        <i className="fa-regular fa-house"></i> Back to Home
        </Link>
      </button>
    </div>
  )
}
