import React,{useState} from 'react'
import {Modal, Form, Button} from 'semantic-ui-react';
import axios from 'axios';



export function CreateProduct(props) {
    const{open, openCreateProductModal,fetchProduct}= props;

    //creating const to save data from input field

    const[pName, setPName]=useState("");
    const[price , setPrice]=useState();
    
    //function to create customer and sending into databse
    const createProduct=()=>{
        axios.post("Products/PostProduct", {
            name:pName,
            price:price,
          }).then(res =>{
            openCreateProductModal(false);
            setPName("");
            setPrice("");
            fetchProduct();
          }).catch(err =>{
            alert(err);
          })
        }


    return (
        <Modal
      
      open={open}
      
    >
      
      <Modal.Header>Create a new Product</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          
          <Form>
      <Form.Field>
      <label>Product Name</label>
      <input placeholder='Enter Product' onChange={(e)=> setPName(e.target.value)}/>  
    
      </Form.Field>
      <Form.Field>
      <label>Price (AUD$) <p style={{color:'red'}}> No decimal accepted</p></label>
      <input placeholder='Enter Price in $' defaultValue="0" onChange={(e)=>{setPrice(e.target.value)}} />
     </Form.Field>

  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={()=>openCreateProductModal(false)}>
          Cancel
        </Button>
        {/* When click ok running createCustomer function which input the data into the database, setting the modal to false for closing the modal and refresh the page along*/}

        <Button color="green" onClick={()=>{createProduct();openCreateProductModal(false)}}> Ok</Button>
          
      </Modal.Actions>
    </Modal>
    
  )
    
}
