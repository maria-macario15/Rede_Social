import React, {useState} from 'react'
import {Tab, Nav, TabContent, Button, Modal} from 'react-bootstrap'
import Contacts from './Contacts'
import Conversations from './Conversations'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const CONVERSATION_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function SideBar({id}) {
  const [activeKey, setActiveKey] = useState(CONVERSATION_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const conversationsOpen = activeKey === CONVERSATION_KEY

  function closeModal(){
    setModalOpen(false)
  }

  return (
    <div style={{width: '250px'}} className="d-flex flex-column">
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            {/* Nav */}
            <Nav variant="tabs" className='justify-content-center'>
                <Nav.Item>
                   <Nav.Link eventKey={CONVERSATION_KEY}>Conversations</Nav.Link> 
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link> 
                </Nav.Item>
            </Nav>
            {/* Tab Content */}
            <TabContent className='border-end overflow-auto flex-grow-1'>
              <Tab.Pane eventKey={CONVERSATION_KEY}>
                <Conversations/>
              </Tab.Pane>
              <Tab.Pane eventKey={CONTACTS_KEY}>
                <Contacts/>
              </Tab.Pane>
            </TabContent>
            {/* Button */}
            <div className='p-2 border-top border-end small'>
              Your ID: <span className='text-muted'>{id}</span>
            </div>
            {/* Button */}
            <Button onClick={()=>setModalOpen(true)} className="rounded-0">
              New {conversationsOpen ? 'Conversation' : 'Contact'}
            </Button>
        </Tab.Container>
        {/* Modal */}
        <Modal show={modalOpen} onHide={closeModal}>
          {conversationsOpen ? <NewConversationModal closeModal={closeModal}/> : <NewContactModal closeModal={closeModal}/>}
        </Modal>
    </div>
  )
}
