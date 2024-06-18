import { Container , Form, Button } from 'react-bootstrap'
import React, {useRef} from 'react'
import {v4 as uuidV4 } from 'uuid'

export default function Login({onIdSubmit}) {
    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        onIdSubmit(idRef.current.value)
    }

    function createNewId(){
        onIdSubmit(uuidV4)
    }

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
        <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group>
                <Form.Label>Enter your ID</Form.Label>
                <Form.Control type="text" ref={idRef} required></Form.Control>
            </Form.Group>
            <Button type="submit" className='mt-2' style={{marginRight: '5px'}}>Login</Button>
            <Button onClick={createNewId} variant="secondary" className='mt-2'>Crerate a new ID</Button>
        </Form>
    </Container>
  )
}
