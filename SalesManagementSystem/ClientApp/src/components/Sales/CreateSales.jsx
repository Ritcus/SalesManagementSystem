import React,{useState, useEffect} from 'react'
import {Modal, Form, Button, Select} from 'semantic-ui-react';
import axios from 'axios';
import DatePicker from "react-datepicker";



import "react-datepicker/dist/react-datepicker.css";




export function CreateSales(props) {
    const{open, openCreateSalesModal,fetchSales,store,product,customer}= props;

    //creating const to save data from input field

    const[sCId, setSCId]=useState();
    const[sPId , setSPId]=useState();
    const[sSId, setSSId]=useState();
    const[sDate , setSDate]=useState(new Date());


    //Options for select box of Customers, Products and Stores

   

    let getProductID =(event,{value})=>{
      
      setSPId(value);
    }

    let getCustomerID =(event,{value})=>{
      
      setSCId(value);
   
    }
    let getStoreID =(event,{value})=>{
      
      setSSId(value);
      
    }

    
    
    //function to create customer and sending into databse
    const createSales=()=>{
        axios.post("Sales/PostSales", {
            customerId:sCId,
            storeId:sSId,
            productId:sPId,
            dateSold:sDate
          }).then(res =>{
            openCreateSalesModal(false);
            setSCId("");
            setSPId("");
            setSSId("");
            setSDate("");
            fetchSales();
          }).catch(err =>{
            alert(err);
          })
        }

        let customerOption = customer.map(c=>{
          return({text: c.name, value:c.id})
      })
  
      let productOption = product.map(p=>{
        return({text: p.name, value:p.id})
    })
  
    let storeOption = store.map(s=>{
      return({text: s.name, value:s.id})
  })
  


    return (
        <Modal
      
      open={open}
      
    >
      
      <Modal.Header>Create a new Sale</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          
          <Form >
      <Form.Field>
      <label>Date Sold </label>
      <DatePicker selected={sDate} onChange={(e)=>{setSDate(e)}} /> 
      </Form.Field>

      <Form.Field>
      <label>Select Customer</label>
       
      <Select placeholder='Please select Customer' onChange={getCustomerID} options={customerOption} />
      <Form.Field>

      <label>Select Product</label>
      <Select placeholder='Please select Product' onChange={getProductID} options={productOption} />
      </Form.Field>
      <Form.Field>
      <label>Select Store</label>
      <Select placeholder='Please select Store' onChange={getStoreID} options={storeOption} />
    
      </Form.Field>
      
     </Form.Field>

  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={()=>openCreateSalesModal(false)}>
          Cancel
        </Button>
        {/* When click ok running createCustomer function which input the data into the database, setting the modal to false for closing the modal and refresh the page along*/}

        <Button color="green" onClick={()=>{createSales();openCreateSalesModal(false)}}> Ok</Button>
          
      </Modal.Actions>
    </Modal>
    
  )
    
}
