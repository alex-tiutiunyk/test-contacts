import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useEditContactMutation } from "../redux/contactsApi";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { NO_IMG_URL } from "../constants";
import Spinner from "./Spinner";

const EditModal = ({setIsModal, data, id, refetch}) => {
  const initFirstName = data.request['first name'];
  const initLastName = data.request['last name'];
  const initEmail = data.request.email;
  const initImageUrl = data.request.avatar
  
  const [editContact] = useEditContactMutation();
  
  const [firstName, setFirstName] = useState(initFirstName);
  const [lastName, setLastName] = useState(initLastName);
  const [email, setEmail] = useState(initEmail);
  const [errorEmail, setErrorEmail] = useState(false);
  const [imageUrl, setImageUrl] = useState(initImageUrl)
  const [imageUpload, setImageUpload] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false)

  const avatar = useRef();
  const [fileName, setFileName] = useState('No file chosen');

  const escFunction = (e) => {
    if (e.key === "Escape") {
      setIsModal(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', escFunction)
    return () => {
      window.removeEventListener('keydown', escFunction)
    }
  }, [])

  const handleDialogClose = () => {
    setIsModal(false);
  }

  const handlePrevent = (e) => {
    e.stopPropagation();
  }

  const handleForm = (e) => {
    switch (e.target.id) {
      case 'firstName':
        if (e.target.value === '') return setFirstName(initFirstName);
        setFirstName(e.target.value);
        break;
      case 'lastName':
        if (e.target.value === '') return setLastName(initLastName);
        setLastName(e.target.value);
        break;
      case 'email':
        if (e.target.value === '') return setEmail(initEmail);
        setEmail(e.target.value);
        break;
    }
  }

  const handleEditContact = async () => {
    try {
      if ((firstName !== initFirstName) | (lastName !== initLastName | (email !== initEmail) | (imageUrl != initImageUrl))) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return setErrorEmail(true)
        setErrorEmail(false)
        const prevData = data.request;
        const newData = {
          ["first name"]: firstName,
          ["last name"]: lastName,
          email,
          avatar: imageUrl
        }
        const request = {...prevData, ...newData};
        await editContact({...data, id, request});
        setIsModal(false);
        refetch();
      } else {
        setIsModal(false);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleUpload = (e) => {
    setImageUpload(e.target.files[0]);
    setFileName(e.target.files[0].name)
  }

  const uploadImage = () => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `contacts/${uuidv4() + imageUpload.name}`);
    setIsImageLoading(true)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        avatar.current.src = url
        setImageUrl(avatar.current.src)
        setIsImageLoading(false)
      })
    })
  }

  return (
    <>
      <div className="flex items-center justify-center fixed inset-0 z-[100] bg-stone-900/70 transition ease-in duration-300" onClick={handleDialogClose}>
        <div className="w-full max-w-screen-sm bg-white rounded-lg shadow-lg" onClick={(e) => handlePrevent(e)}>
          <header className="p-4 flex justify-between border-solid border-b border-slate-100">
            <h4 className="text-center text-2xl">Edit contact</h4>
            <button type="button" className="text-2xl" onClick={handleDialogClose}>&times;</button>
          </header>
          <div className="p-4">
            <div className="flex items-center mb-3 gap-4">
              <div className='w-[120px] h-[120px] flex-none overflow-hidden border-2 rounded-full'>
                {isImageLoading && <Spinner />}
                <img
                  className="rounded-full object-cover min-h-full mr-5"
                  ref={avatar}
                  width={120}
                  src={data.request.avatar ? data.request.avatar : NO_IMG_URL}
                  alt={data.request['first name'] + ' ' + data.request['last name']} 
                />
              </div>
              <label className="relative flex text-base border-solid border border-gray-300 rounded-md transition bg-white">
                <span className="px-4 py-2 text-white bg-slate-600 rounded-l-md">Choose File</span>
                <span className="px-2 py-2 max-w-[125px]">
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap">{fileName}</span>
                </span>
                <input type="file" onChange={(e) => handleUpload(e)} className="absolute inset-0 opacity-0"/>
              </label>
              <button
                onClick={uploadImage}
                type="button"
                className="inline-block py-2 px-4 text-base border-solid border border-gray-300 rounded-md transition bg-white hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-sky-200 hover:shadow-md"
              >Upload</button>
            </div>
            <div className="flex items-center mb-3">
              <label htmlFor="firstName" className="whitespace-nowrap min-w-28 pr-2">First Name</label>
              <input
                type="text"
                placeholder={firstName}
                onChange={(e) => handleForm(e)}
                id="firstName"
                className="w-full text-base h-12 p-2 pb-2.5 rounded-lg leading-7 border-solid border transition focus:outline-0  focus:shadow-md border-gray-300  focus:border-sky-500 focus:shadow-sky-200"
              />
            </div>
            <div className="flex items-center mb-3">
              <label htmlFor="lastName" className="whitespace-nowrap min-w-28 pr-2">Last Name</label>
              <input
                type="text"
                placeholder={lastName}
                onChange={(e) => handleForm(e)}
                id="lastName"
                className="w-full text-base h-12 p-2 pb-2.5 rounded-lg leading-7 border-solid border transition focus:outline-0  focus:shadow-md border-gray-300  focus:border-sky-500 focus:shadow-sky-200"
              />
            </div>
            <div className="flex items-center mb-3">
              <label htmlFor="email" className="whitespace-nowrap min-w-28 pr-2">Email</label>
              <input
                type="email"
                placeholder={email}
                onChange={(e) => handleForm(e)}
                id="email"
                className={`w-full text-base h-12 p-2 pb-2.5 rounded-lg leading-7 border-solid border transition focus:outline-0  focus:shadow-md 
                  ${errorEmail 
                    ? 'border-red-500  focus:border-red-500 focus:shadow-red-200'
                    : 'border-gray-300  focus:border-sky-500 focus:shadow-sky-200'}
                `}
              />
            </div>
          </div>
          <footer className="p-4 bg-slate-100 rounded-b-lg text-center">
            <button
            onClick={handleEditContact}
              type="button"
              className="inline-block py-2 px-4 me-2 text-base border-solid border border-sky-500 rounded-md transition bg-sky-500 text-white hover:bg-white hover:border-gray-300 hover:text-black hover:shadow-black-300 hover:shadow-md"
            >Save</button>
            <button
              onClick={handleDialogClose}
              type="button"
              className="inline-block py-2 px-4 text-base border-solid border border-gray-300 rounded-md transition bg-white hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-sky-200 hover:shadow-md"
            >Cancel</button>
          </footer>
        </div>
      </div>
    </>
  )
}

EditModal.propTypes = {
  setIsModal: PropTypes.func,
  data: PropTypes.object,
  id: PropTypes.string,
  refetch: PropTypes.func
};


export default EditModal