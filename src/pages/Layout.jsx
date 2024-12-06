import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <main className="grow flex">
        <Outlet />
      </main>

      <footer className='px-4'>
        <div className='bg-gray-200 p-4 rounded-t-md'>
          <a href="mailto:alex.tiutiunyk@gmail.com" className="text-sky-600 hover:underline">alex.tiutiunyk@gmail.com</a>
        </div>
      </footer>
    </>
  )
}

export default Layout
