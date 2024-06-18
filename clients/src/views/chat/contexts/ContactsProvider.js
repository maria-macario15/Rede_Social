import React, {useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts(){
  return useContext(ContactsContext)
}

export function ContactsProvider({children}) {
  //const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [username, setUserName] = useState('')
  const [user_img, setUser_img] = useState('')
 /* function createContact(id, name){
    setContacts(prevContacts =>{
      return [...prevContacts, {id, name}]
    })
  }*/
  
  return (
    <ContactsContext.Provider value={{ user_img, username }}>
      {children}
    </ContactsContext.Provider>
  )
}
