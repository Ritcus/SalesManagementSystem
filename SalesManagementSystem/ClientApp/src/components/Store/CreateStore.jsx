import React,{useState} from 'react'
import {Modal, Form, Button} from 'semantic-ui-react';
import axios from 'axios';



export function CreateStore(props) {
    const{open, openCreateStoreModal,fetchStore}= props;

    //creating const to save data from input field

    const[sProduct, setSName]=useState("");
    const[saddress , setSAddress]=useState();
    
    
    //function to create customer and sending into databse
    const createStore=()=>{
        axios.post("Stores/PostStore", {
            name:sProduct,
            address:saddress,
          }).then(res =>{
            openCreateStoreModal(false);
            setSName("");
            setSAddress("");
            fetchStore();
          }).catch(err =>{
            alert(err);
          })
        }


    return (
        <Modal
      
      open={open}
      
    >
      
      <Modal.Header>Create a new Store</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          
          <Form>
      <Form.Field>
      <label>Store Name</label>
      <input placeholder='Enter Store Name' onChange={(e)=> setSName(e.target.value)}/>  
    
      </Form.Field>
      <Form.Field>
      <label>Store Address</label>
      <input placeholder='Enter Store Address' onChange={(e)=>{setSAddress(e.target.value)}} />
     </Form.Field>

  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={()=>openCreateStoreModal(false)}>
          Cancel
        </Button>
        {/* When click ok running createCustomer function which input the data into the database, setting the modal to false for closing the modal and refresh the page along*/}

        <Button color="green" onClick={()=>{createStore();openCreateStoreModal(false)}}> Ok</Button>
          
      </Modal.Actions>
    </Modal>
    
  )
    
}
