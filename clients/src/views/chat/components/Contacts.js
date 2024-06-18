import React, { useState } from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { ListGroup } from 'react-bootstrap'
function Contacts() {
  const [username, setUserName] = useState('')
  const [user_img, setUser_img] = useState('')
  const { contacts } = useContacts()
  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
export default Contacts;
