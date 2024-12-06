import { useState } from "react";
import { useAddContactMutation } from "../redux/contactsApi";

const CreateContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState('Enter your email');

  const [addContact] = useAddContactMutation();

  const handleForm = (e) => {
    switch (e.target.id) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
    }
  }

  const handleCreateContact = async () => {
    try {
      const request = {
        "first name": firstName,
        "last name": lastName,
        "email": email,
        "avatar": "",
        "tags": "[]",
        "created": new Date().toISOString()
      };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      (!firstName && !lastName) ? setErrorName(true) : setErrorName(false);

      if (emailRegex.test(email)) setErrorEmail(false);

      if (!email) {
        setErrorEmail(true);
        setErrorEmailMessage('Enter Email');
      } else if (email && !emailRegex.test(email)) {
        setErrorEmailMessage('Enter correct Email');
        setErrorEmail(true);
      } else if ((firstName || lastName) && emailRegex.test(email)) {
        setErrorEmail(false);
        await addContact({request}).unwrap();
        setFirstName('');
        setLastName('');
        setEmail('');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2 className='text-xl font-bold mb-2'>Create Contact</h2>
      <div className='pb-2 flex flex-col'>
        <label htmlFor="firstName" className='text-xs pb-1'>First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleForm}
          className={`text-base h-12 p-2 pb-2.5 rounded-lg leading-7 border-solid border transition focus:outline-0  focus:shadow-md 
            ${errorName
              ? 'border-red-500  focus:border-red-500 focus:shadow-red-200'
              : 'border-gray-300  focus:border-sky-500 focus:shadow-sky-200'}
          `}
        />
        {errorName && <div className="text-s text-red-500 pt-1">First Name or Last Name must be filled</div>}
      </div>
      <div className='pb-2 flex flex-col'>
        <label htmlFor="lastName" className='text-xs pb-1'>Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleForm}
          className={`text-base h-12 p-2 pb-2.5 rounded-lg leading-7 border-solid border transition focus:outline-0  focus:shadow-md 
            ${errorName
              ? 'border-red-500  focus:border-red-500 focus:shadow-red-200'
              : 'border-gray-300  focus:border-sky-500 focus:shadow-sky-200'}
            }
          `}
        />
        {errorName && <div className="text-s text-red-500 pt-1">First Name or Last Name must be filled</div>}
      </div>
      <div className='pb-2 flex flex-col'>
        <label htmlFor="email" className='text-xs pb-1'>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleForm}
          className={`text-base h-12 p-2 pb-2.5 rounded-lg leading-7 border-solid border transition focus:outline-0  focus:shadow-md 
            ${errorEmail
              ? 'border-red-500  focus:border-red-500 focus:shadow-red-200'
              : 'border-gray-300  focus:border-sky-500 focus:shadow-sky-200'}
          `}
        />
        {errorEmail && <div className="text-s text-red-500 pt-1">{errorEmailMessage}</div>}
      </div>
      <button
        type="button"
        onClick={handleCreateContact}
        className="mt-3 text-base font-bold h-11 border-solid border border-gray-300 w-full rounded-md transition hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-sky-200 hover:shadow-md"
      >Add Contact</button>
    </>
  )
}

export default CreateContact
