import React from 'react'

const Footer = () => {
  return (
    

<footer className=" rounded-lg shadow m-4 ">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm -500 sm:text-center dark:-400">© 2024 <a href="" className="hover:underline">Made with love by Harsh.</a>
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium -500 dark:-400 sm:mt-0">
        <li>
            <a href="#features" className="hover:underline me-4 md:me-6">Features</a>
        </li>
        <li>
            <a href="#pricing" className="hover:underline me-4 md:me-6">Pricing</a>
        </li>
        <li>
            <a href="/terms/privacy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer