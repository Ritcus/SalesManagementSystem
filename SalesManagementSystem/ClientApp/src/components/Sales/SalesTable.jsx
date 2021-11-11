import React, {useState} from 'react'
import { Table,Form,Button,Modal, Dropdown, Select} from 'semantic-ui-react'
import '../Customer/Paginations.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios'
import edit from '../../img/edit.png'
import del from '../../img/del.png'



import ReactPaginate from 'react-paginate'



 //calling props from CustomerHome for getting customer data and refreshing the page when delete 
const SalesTable = (props) => {
    const{sales, refreshPage, customer, product, store,sorting}=props;


    //sales a particular customer while mappling which later be used as editing or deleting the same customer
    const[selectedS, setSelectedS] = useState();

    //just sales the boolean to show edit or del modal
    const[delmodalShow, setDelModalShow] = useState();
    const[editmodalShow, setEditModalShow] = useState();


    //used to call delete function to API
    const deleteSales=(id)=>{
      
        axios.delete(`Sales/DeleteSales/${id}`)
        .then (res => { 
          refreshPage()
        }).catch(err => {
          console.log(err)
        })
        
    }

    // creating an aray for option on dropdown box to show the number of element
    let optio=[{name:"3", id:3},
    {name:"5", id:5},
    {name:"7", id:7},
    {name:"10", id:10}
     ];



  let productOption = product.map(p=>{
    return(
      
      {text: p.name, value:p.id})
})

let storeOption = store.map(s=>{
 return({text: s.name, value:s.id})
})

let customerOption = customer.map(c=>{
  return({text: c.name, value:c.id})
})

     //mapping inside the same optio above to get particular element value and its text
    let option= optio.map(r=>{
     return({text:r.name, value:r.id})
    })

    //basically setting the number of customer to be shown using select box from above option
    let getDisplayItem=(event,{value})=>{
      setSalesPerPage(value)
      
    }


    //basic logic to display number of customer per page using reactpaginate component
    const [pageNumber,setPageNumber] = useState(0)
    const [salesPerPage,setSalesPerPage] =useState(7)
    const pagesVisited = pageNumber * salesPerPage
    const displaySalesPage= sales.slice(pagesVisited, pagesVisited +salesPerPage)
    const changePage =({selected})=>{
      setPageNumber(selected)
      
    }
    const pagesCount =Math.ceil(sales.length /salesPerPage );

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const displayMonthName=(getsomedate)=>{
      var selecmonth=monthNames[getsomedate.slice(5,7)-1].toUpperCase();
      
      return(getsomedate.slice(8,10)+" "+selecmonth+", "+getsomedate.slice(0,4))
    }


    //thats where our table stated and will be mapping the when user select how many customer shown per page .. onfirst run it will just pickup the default value of 10 customer per page

    return(
      
 <div style={{marginTop:'15px'}}>
  <Table celled striped>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Sale ID <i style={{cursor:"pointer"}} className="sort icon" onClick={()=>{sorting("id")}}/></Table.HeaderCell>
      <Table.HeaderCell >Customer Name <i style={{cursor:"pointer"}} className="sort icon" onClick={()=>{sorting("customer")}}/></Table.HeaderCell>
        <Table.HeaderCell>Product Bought<i style={{cursor:"pointer"}} className="sort icon" onClick={()=>{sorting("product")}}/></Table.HeaderCell>
        <Table.HeaderCell>Store Name<i style={{cursor:"pointer"}} className="sort icon" onClick={()=>{sorting("store")}}/></Table.HeaderCell>
        <Table.HeaderCell>Date Sold <i style={{cursor:"pointer"}} className="sort icon" onClick={()=>{sorting("dateSold")}}/></Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
      
    <Table.Body > 
    {displaySalesPage.map((s)=>{
      return(
      
      <Table.Row key={s.id}>
          <Table.Cell>{s.id}</Table.Cell>
          <Table.Cell onClick={()=>console.log(s.customer.name)}>{s.customer ? s.customer.name:"No customer assigned"}</Table.Cell>
        <Table.Cell>{s.product ? s.product.name:"No customer assigned"}</Table.Cell>
        <Table.Cell>{s.store ? s.store.name:"No customer assigned"}</Table.Cell>
        <Table.Cell>{displayMonthName(s.dateSold)}</Table.Cell>
        
        
         <Table.Cell>
         <Button color="red"  onClick={()=>{setDelModalShow(true);setSelectedS(s)}} ><img src={del} style={{maxWidth:'20px',maxHeight:'15px'}} /> Delete</Button>
        
         </Table.Cell>
         <Table.Cell>
         <Button color="yellow" onClick={()=>{setEditModalShow(true);setSelectedS(s)}} ><img src={edit} style={{maxWidth:'20px',maxHeight:'20px'}} /> Edit</Button>
         {/*  */}
            </Table.Cell>
      </Table.Row>
    )})}
      
        {/* calling delete modal from modal function just below and setting respective value */}

      { delmodalShow ?
      <ModaldeleteSales mShow={delmodalShow}
      deletSal={()=>{deleteSales(selectedS.id);setDelModalShow(false)}}
      hide={()=> {setDelModalShow(false); setSelectedS({})}}
      SalName={selectedS.id}
     />
      :null}

 {/* calling edit modal from other edit page just below and setting respective value */}
      { editmodalShow ? 
      
      <EditSalesModal nShow={editmodalShow} sid={selectedS.id} 
      productOption={productOption}
      storeOption={storeOption}
      customerOption={customerOption}
      customerId={selectedS.customerId}
      sStore={selectedS.storeId}
      sProduct={selectedS.productId}
      sDate={selectedS.dateSold}
      
     
    
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

const ModaldeleteSales = ({mShow,hide,deletSal, SalName})=> {

  
  return(
            <Modal

            // setting true to show / false to hide modal using mShow

            open={mShow}
        >
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
          {'Are you sure ? You want to delete Sale No. : '}<p style={{color:"red",fontSize:"25px"}}> {SalName} </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={hide}>
            Cancel
          </Button>
          <Button positive onClick={deletSal} >
            Confrim
          </Button>
        </Modal.Actions>
      </Modal>
  )

}


//Edit modal for the Store


const EditSalesModal =({ sStore,sDate, sProduct,sid,customerId, nHide,productOption, storeOption,customerOption }) =>{
  

  //creating const to save data from input field
    
    
      const[storeId, setStoreId]=useState(sStore);
      const[productId, setProductId]=useState(sProduct);
      const[SalesDate, setSalesDate]=useState(new Date(sDate));
  
      const[nShow,setNShow]=useState(true)
  
      //seting to show modal according to nShow used in customer table
      let showModel=(value)=>{
        setNShow(value)
      }
  
      //default function to refresh the page
      function refreshPage() {
        window.location.reload(false);
      }
  
      
      let getStoreID =(event,{value})=>{
        setStoreId(value);
        
      }

      let getProductID =(event,{value})=>{
        
        setProductId(value);
      }

      
    let getCustomerID =(event,{customerId})=>{
     return(customerId)
    }
      
    
      
      // inserting the data to the database after edit while getting the same id 
     let editStore=(sid)=>{
  
      axios.put(`/Sales/PutSales/${sid}`,{
        id:sid,
        dateSold:SalesDate,
        customerId:customerId,
        productId:productId,
        storeId:storeId
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
  <label>Date of Sale</label>
  
    {/* getting the input from the user and setting it using usestate */}
    <DatePicker selected={SalesDate} onChange={(e)=>{setSalesDate(e)}} /> 
  
  </Form.Field>
  <Form.Field>
  <label>Customer Name <p style={{color:"red"}}>(Customer Name cannot be changed)</p></label>
  
  {/* getting the input from the user and setting it using usestate */}
  <Select value={customerId} onChange={getCustomerID} options={customerOption} />
  </Form.Field>
  <Form.Field>
  <label>Product Bought</label>
        <Select defaultValue={sProduct} onChange={getProductID} options={productOption} />
        </Form.Field>
        <Form.Field>
  
        <label>Store Name</label>
        <Select defaultValue={sStore} onChange={getStoreID} options={storeOption} />
        
  
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
  
  <Button color="green" onClick={()=>{editStore(sid);showModel(false);refreshPage()}}> Ok </Button>
  
  </Modal.Actions>
  </Modal> 
    ) 
  
  }

export default SalesTable