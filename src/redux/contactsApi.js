import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { get, orderByChild, push, query, ref, remove, set } from 'firebase/database'
import { db } from '../firebase'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getContacts: builder.query({
      queryFn: async () => {
        try {
          const contactsRef = query(ref(db, 'contacts'), orderByChild('first name'));
          const snapshot = await get(contactsRef);
          const response = snapshot.val();
          if (snapshot.exists()) {
            // transformed output data
            const outData = Object.entries(response).map(item => {
              return {
                id: item[0],
                ...item[1]
              }
            })
            return {data: outData}
          }
        } catch (err) {
          return {error: err}
        }
      },
      providesTags: (result = []) => [
        'Contacts',
        ...result.map(({ id }) => ({ type: 'Contacts', id }))
      ]
    }),
    getOneContact: builder.query({
      queryFn: async (id) => {
        try {
          const oneContactRef = ref(db, `contacts/${id}`)
          const snapshot = await get(oneContactRef)
          const response = snapshot.val()
          if (snapshot.exists()) {
            return {data: response}
          }
        } catch (err) {
          return {error: err}
        }
      }
    }),
    addContact: builder.mutation({
      queryFn: async (body) => {
        try {
          const newContactRef = push(ref(db, 'contacts'));
          const data = await set(newContactRef, body)
          return {data: data}
        } catch (err) {
          return {error: err}
        }
      },
      invalidatesTags: ['Contacts']
    }),
    editContact: builder.mutation({
      queryFn: async (body) => {
        try {
          const editContactRef = ref(db, `contacts/${body.id}`);
          const data = await set(editContactRef, {
            request: body.request
          })
          return {data: data}
        } catch (err) {
          return {error: err}
        }
      },
      invalidatesTags: (id) => [{ type: 'Contacts', id}]
    }),
    deleteContact: builder.mutation({
      queryFn: async (id) => {
        try {
          const delContactRef = ref(db, `contacts/${id}`);
          const data = await remove(delContactRef)
          return {data: data}
        } catch (err) {
          return {error: err}
        }
      },
      invalidatesTags: (id) => [{ type: 'Contacts', id}]
    }),
  })
})

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useGetOneContactQuery,
  useEditContactMutation
} = contactsApi;