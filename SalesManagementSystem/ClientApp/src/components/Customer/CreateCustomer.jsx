import React,{useState} from 'react'
import {Modal, Form, Button} from 'semantic-ui-react';




export function CreateCustomer(props) {
    const{open, openCreateCustomerModal,showCustomer}= props;

    //creating const to save data from input field

    const[fullName, setFullName]=useState("");
    const[address, setAddress]=useState("");
    
    //function to create customer and sending into databse
    const createCustomer=()=>{
      let url= 'Customers/PostCustomer';
      let user= {name:fullName, address:address};

      fetch(url, {
        method:"POST",
        body:JSON.stringify(user),
        headers:{'accept':'application/json', 'Content-type':'application/json'}
      }).then(result=>{
        showCustomer();
      }).then(json =>{
        console.log(json)
      })
    }


    return (
        <Modal
      
      open={open}
      
    >
      
      <Modal.Header>Create new Customer</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          
          <Form>
      <Form.Field>
      <label>Name</label>
      <input placeholder='Enter Full Name' onChange={(e)=> setFullName(e.target.value)}/>  
    
      </Form.Field>
      <Form.Field>
      <label>Address</label>
      <input placeholder='Enter Address' onChange={(e)=> setAddress(e.target.value)} />
     </Form.Field>

  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={()=>openCreateCustomerModal(false)}>
          Cancel
        </Button>
        {/* When click ok running createCustomer function which input the data into the database, setting the modal to false for closing the modal and refresh the page along*/}

        <Button color="green" onClick={()=>{createCustomer();openCreateCustomerModal(false)}}> Ok</Button>
          
      </Modal.Actions>
    </Modal>
    
  )
    
}
