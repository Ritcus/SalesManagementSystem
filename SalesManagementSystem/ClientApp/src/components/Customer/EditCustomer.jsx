
import React, {useState} from 'react'
import { Icon, Table, Menu, Select, Form,Button,Modal } from 'semantic-ui-react'

import axios from 'axios'


  

//modal function for editing
const EditCustomerModal =({cname, caddress,nid, nHide }) =>{

//creating const to save data from input field

  const[fullName, setFullName]=useState(cname);
    const[address, setAddress]=useState(caddress);
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

    axios.put(`/Customers/PutCustomer/${nid}`,{
      id:nid,
      name:fullName,
      address:address
    }).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
      
    })
  }

return(
<Modal
//setting value to show/hide the modal

open={nShow}>

<Modal.Header>Edit Customer</Modal.Header>
<Modal.Content>

<Modal.Description>

<Form>
<Form.Field>
<label>Name</label>

  {/* getting the input from the user and setting it using usestate */}

<input defaultValue={cname}  onChange={(e)=> setFullName(e.target.value)}/>  

</Form.Field>
<Form.Field>
<label>Address</label>

{/* getting the input from the user and setting it using usestate */}

<input defaultValue={caddress}  onChange={(e)=> setAddress(e.target.value)} />
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

<Button color="green" onClick={()=>{editCustomer(nid);showModel(false);refreshPage()}}> Ok </Button>

</Modal.Actions>
</Modal> 
  ) 

}

export default EditCustomerModal