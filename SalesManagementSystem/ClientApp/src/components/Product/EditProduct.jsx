
import React, {useState} from 'react'
import {  Form,Button,Modal } from 'semantic-ui-react'

import axios from 'axios'


  

//modal function for editing
const EditProductModal =({pname, pPrice,nid, nHide }) =>{

//creating const to save data from input field

  const[pName, setpName]=useState(pname);
    const[price, setPrice]=useState(pPrice);
    const[nShow,setNShow]=useState(true)

    //seting to show modal according to nShow used in customer table
    let showModel=(value)=>{
      setNShow(value)
    }

    //default function to refresh the page
    function refreshPage() {
      window.location.reload(false);
    }
  
    
    // inserting the data to the database after edit while getting the same id 
   let editCustomer=(nid)=>{

    axios.put(`/Products/PutProduct/${nid}`,{
      id:nid,
      name:pName,
      price:price
    }).then((data)=>{
      refreshPage()
    }).catch((err)=>{
        console.log(err)
    })
  }

return(
<Modal
//setting value to show/hide the modal

open={nShow}>

<Modal.Header>Edit Product</Modal.Header>
<Modal.Content>

<Modal.Description>

<Form>
<Form.Field>
<label>Name</label>

  {/* getting the input from the user and setting it using usestate */}

<input defaultValue={pname}  onChange={(e)=> setpName(e.target.value)}/>  

</Form.Field>
<Form.Field>
<label>Price (AUD$) <p style={{color:'red'}}> No decimal accepted</p> </label>

{/* getting the input from the user and setting it using usestate */}

<input defaultValue={pPrice}  onChange={(e)=> setPrice(e.target.value)} />
</Form.Field>

</Form>   
</Modal.Description>
</Modal.Content>
<Modal.Actions>

  {/* hiding the model when click cancel */}

<Button color='black'onClick={nHide}>
Cancel
</Button>

{/* When click ok running editCustomer function which input the data into the datbase, setting the modal to false for closing the modal and refresh the page along using hard reload */}

<Button color="green" onClick={()=>{editCustomer(nid);showModel(false)}}> Ok </Button>

</Modal.Actions>
</Modal> 
  ) 

}

export default EditProductModal