import Contacts from "../components/Contacts"
import CreateContact from "../components/CreateContact"

const HomePage = () => {

  return (
    <div className="flex w-full flex-col items-start md:flex-row pt-7 pb-5">
      <div className='w-full flex-1 order-2 p-4 h-full relative'>
        <Contacts/>
      </div>
      <aside className="mx-auto w-80 order-1 p-4 md:sticky md:top-0">
        <CreateContact/>
      </aside>
    </div>
  )
}

export default HomePage
