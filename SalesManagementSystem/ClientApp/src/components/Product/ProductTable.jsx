import React, {useState} from 'react'
import { Table,Form,Button,Modal, Dropdown,} from 'semantic-ui-react'
import '../Customer/Paginations.css';

import axios from 'axios'
import edit from '../../img/edit.png'
import del from '../../img/del.png'



import ReactPaginate from 'react-paginate'
import EditProductModal from './EditProduct';


 //calling props from CustomerHome for getting customer data and refreshing the page when delete 
const ProductTable = (props) => {
    const{product, refreshPage}=props;


    //store a particular customer while mappling which later be used as editing or deleting the same customer
    const[selectedP, setSelectedP] = useState();

    //just store the boolean to show edit or del modal
    const[delmodalShow, setDelModalShow] = useState();
    const[editmodalShow, setEditModalShow] = useState();


    //used to call delete function to API
    const deleteProduct=(id)=>{
      
        axios.delete(`Products/DeleteProduct/${id}`)
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

     //mapping inside the same optio above to get particular element value and its text
    let option= optio.map(r=>{
     return({text:r.name, value:r.id})
    })

    //basically setting the number of customer to be shown using select box from above option
    let getDisplayItem=(event,{value})=>{
      setProductPerPage(value)
      
    }


    //basic logic to display number of customer per page using reactpaginate component
    const [pageNumber,setPageNumber] = useState(0)
    const [productPerPage,setProductPerPage] =useState(7)
    const pagesVisited = pageNumber * productPerPage
    const displayProductPage= product.slice(pagesVisited, pagesVisited +productPerPage)
    const changePage =({selected})=>{
      setPageNumber(selected)
      
    }
    const pagesCount =Math.ceil(product.length /productPerPage );
   

    //thats where our table stated and will be mapping the when user select how many customer shown per page .. onfirst run it will just pickup the default value of 10 customer per page

    return(
      
 <div style={{marginTop:'15px'}}>
  <Table celled striped>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Price (AUD$)</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
      
    <Table.Body > 
    {displayProductPage.map((p)=>{
      return(
      <Table.Row key={p.id}>
        <Table.Cell>{p.name}</Table.Cell>
        <Table.Cell>{p.price}</Table.Cell>
        
         <Table.Cell>
         <Button color="red"  onClick={()=>{setDelModalShow(true);setSelectedP(p)}} ><img src={del} style={{maxWidth:'20px',maxHeight:'15px'}} /> Delete</Button>
        
         </Table.Cell>
         <Table.Cell>
         <Button color="yellow" onClick={()=>{setEditModalShow(true);setSelectedP(p)}} ><img src={edit} style={{maxWidth:'20px',maxHeight:'20px'}} /> Edit</Button>
         {/*  */}
            </Table.Cell>
      </Table.Row>
    )})}
      
        {/* calling delete modal from modal function just below and setting respective value */}

      { delmodalShow ?
      <ModaldeleteProduct mShow={delmodalShow}
      deletPro={()=>{deleteProduct(selectedP.id);setDelModalShow(false)}}
      hide={()=> {setDelModalShow(false); setSelectedP({})}}
      ProName={selectedP.name}
     />
      :null}

 {/* calling edit modal from other edit page just below and setting respective value */}
      { editmodalShow ? 
      
      <EditProductModal nShow={editmodalShow} nid={selectedP.id} 

      pname={selectedP.name}
      pPrice={selectedP.price}
      
     
    
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

const ModaldeleteProduct = ({mShow,hide,deletPro, ProName})=> {

  
  return(
            <Modal

            // setting true to show / false to hide modal using mShow

            open={mShow}
        >
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
          {'Are you sure ? You want to delete product : '}<p style={{color:"red",fontSize:"25px"}}> {ProName} </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={hide}>
            Cancel
          </Button>
          <Button positive onClick={deletPro} >
            Confrim
          </Button>
        </Modal.Actions>
      </Modal>
  )

}

export default ProductTable