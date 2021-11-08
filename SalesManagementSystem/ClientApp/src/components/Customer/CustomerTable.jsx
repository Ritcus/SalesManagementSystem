import React, {useState} from 'react'
import { Table,Form,Button,Modal, Dropdown,} from 'semantic-ui-react'
import './Paginations.css';

import $ from 'jquery'
import edit from '../../img/edit.png'
import del from '../../img/del.png'

import EditCustomerModal from './EditCustomer'


import ReactPaginate from 'react-paginate'


 //calling props from CustomerHome for getting customer data and refreshing the page when delete 
const CustomerTable = (props) => {
    const{customer, refreshPage}=props;


    //store a particular customer while mappling which later be used as editing or deleting the same customer
    const[selectedItem, setSelectedItem] = useState();

    //just store the boolean to show edit or del modal
    const[delmodalShow, setDelModalShow] = useState();
    const[editmodalShow, setEditModalShow] = useState();


    //used to call delete function to API
    const deleteCustomer=(id)=>{
      
      $.ajax({
        url:`https://localhost:44353/Customers/DeleteCustomer/`+id,
        data:{id:id},
        type:'delete',
        cache:true,
        success:function(aa){
          refreshPage()
        }
        })
        
    }

    // creating an aray for option on dropdown box to show the number of element
    let optio=[{name:"3", id:3},
    {name:"5", id:5},
    {name:"7", id:7},
    {name:"10", id:10}
     ];

     //mapping inside the same optio above to get particular element value and its text
    let option= optio.map(r=>{
     return({text:r.name, value:r.id})
    })

    //basically setting the number of customer to be shown using select box from above option
    let getDisplayItem=(event,{value})=>{
      setCustomerPerPage(value)
      
    }


    //basic logic to display number of customer per page using reactpaginate component
    const [pageNumber,setPageNumber] = useState(0)
    const [customersPerPage,setCustomerPerPage] =useState(7)
    const pagesVisited = pageNumber * customersPerPage
    const displayCustomerPage= customer.slice(pagesVisited, pagesVisited +customersPerPage)
    const changePage =({selected})=>{
      setPageNumber(selected)
      
    }
    const pagesCount =Math.ceil(customer.length /customersPerPage );
   

    //thats where our table stated and will be mapping the when user select how many customer shown per page .. onfirst run it will just pickup the default value of 10 customer per page

    return(
      
 <div style={{marginTop:'15px'}}>
  <Table celled striped>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
      
    <Table.Body > 
    {displayCustomerPage.map((c)=>{
      return(
      <Table.Row key={c.id}>
        <Table.Cell>{c.name}</Table.Cell>
        <Table.Cell>{c.address}</Table.Cell>
        
         <Table.Cell>
         <Button color="red"  onClick={()=>{setDelModalShow(true);setSelectedItem(c)}} ><img src={del} style={{maxWidth:'20px',maxHeight:'15px'}} /> Delete</Button>
        
         </Table.Cell>
         <Table.Cell>
         <Button color="yellow" onClick={()=>{setEditModalShow(true);setSelectedItem(c)}} ><img src={edit} style={{maxWidth:'20px',maxHeight:'20px'}} /> Edit</Button>
         {/*  */}
            </Table.Cell>
      </Table.Row>
    )})}
      
        {/* calling delete modal from modal function just below and setting respective value */}

      { delmodalShow ?
      <ModaldeleteCustomer mShow={delmodalShow}
      deletCus={()=>{deleteCustomer(selectedItem.id);setDelModalShow(false)}}
      hide={()=> {setDelModalShow(false); setSelectedItem({})}}
      CusName={selectedItem.name}
     />
      :null}

 {/* calling edit modal from other edit page just below and setting respective value */}
      { editmodalShow ? 
      
      <EditCustomerModal nShow={editmodalShow} nid={selectedItem.id} 

      cname={selectedItem.name}
      caddress={selectedItem.address}
      
     
    
      nHide={()=> {setEditModalShow(false)}} 
      
     />
      :null}

    </Table.Body>

  </Table>
  
  <Form>
            <Form.Field>
            <Dropdown placeholder="7" onChange={getDisplayItem}  options={option} /> 
            </Form.Field>
            </Form>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pagesCount}
          onPageChange={changePage}
          containerClassName={"paginationBtn"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        
        />
          
</div>
    )
}


//modal to choose between cancel or delete in above delete button 

const ModaldeleteCustomer = ({mShow,hide,deletCus, CusName})=> {

  
  return(
            <Modal

            // setting true to show / false to hide modal using mShow

            open={mShow}
        >
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
          {'Are you sure ? You want to delete customer : '}<p style={{color:"red",fontSize:"25px"}}> {CusName} </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={hide}>
            Cancel
          </Button>
          <Button positive onClick={deletCus} >
            Confrim
          </Button>
        </Modal.Actions>
      </Modal>
  )

}

export default CustomerTable