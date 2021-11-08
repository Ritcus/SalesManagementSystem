
import React, {useState} from 'react'
import {  Form,Button,Modal } from 'semantic-ui-react'

import axios from 'axios'


  

//modal function for editing
const EditStoreModal =({sname, saddress,nid, nHide }) =>{

//creating const to save data from input field

  const[sName, setSName]=useState(sname);
    const[sAddress, setSAddress]=useState(saddress);
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
   let editStore=(nid)=>{

    axios.put(`/Stores/PutStore/${nid}`,{
      id:nid,
      name:sName,
      address:sAddress
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

<Modal.Header>Edit Store</Modal.Header>
<Modal.Content>

<Modal.Description>

<Form>
<Form.Field>
<label>Name of the Store</label>

  {/* getting the input from the user and setting it using usestate */}

<input defaultValue={sname}  onChange={(e)=> setSName(e.target.value)}/>  

</Form.Field>
<Form.Field>
<label>Address</label>

{/* getting the input from the user and setting it using usestate */}

<input defaultValue={saddress}  onChange={(e)=> setSAddress(e.target.value)} />
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

<Button color="green" onClick={()=>{editStore(nid);showModel(false)}}> Ok </Button>

</Modal.Actions>
</Modal> 
  ) 

}

export default EditStoreModal