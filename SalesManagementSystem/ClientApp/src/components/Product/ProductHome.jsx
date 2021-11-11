
import axios from 'axios';
import React,{Component, useEffect,useState} from 'react'

import {Button} from 'semantic-ui-react'

import { CreateProduct } from './CreateProduct';
import ProductTable from './ProductTable';

//props getting from Component
export class ProductHome extends Component {

    constructor(props){
        super(props);

//setting array and boolean to show the model

        this.state={
            product:[],
            open:false,
            order:"ASC"
            
        }
    }

     sorting =(col)=>{
      if (this.state.order ==="ASC"){
        const sorted =[...this.state.product].sort((a,b)=>
        a[col].toLowerCase()> b[col].toLowerCase()? 1:-1);
        this.setState({product: sorted});
        this.setState({order:"DSC"});
      }

      if (this.state.order ==="DSC"){
        const sorted =[...this.state.product].sort((a,b)=>
        a[col].toLowerCase()< b[col].toLowerCase()? 1:-1);
        this.setState({product:sorted});
        this.setState({order:"ASC"});
      }
      
    }

   
   //getting data as soon as the page being mounted 

    componentDidMount(){
        this.fetchProduct();
    }

    //setting up the modal to open and close as per the request

    openCreateProductModal=(value)=>{
        this.setState({
            open:value,
        })
    }

    //getting data from database 

    fetchProduct =() =>{
       axios.get("/Products/GetProduct").then(({data})=>{
           this.setState({
               product:data,
            });
       }).catch((err)=>{
           console.log(err)
       })
    }
    render(){
        const {product,open}=this.state
        

       

    return (
        <div>
            {/* button to create a new data and will open a popup modal to insert the data  */}

             <Button color="blue" className='buttonStyle' onClick={()=>this.openCreateProductModal(true)}>New Product</Button>

                {/* getting create customer function from the createcustomer page and passing up some props */}

             <CreateProduct open={open} openCreateProductModal={this.openCreateProductModal} fetchProduct={this.fetchProduct}  />

             {/* getting and showing customer table function from the customer table page and passing up some props */}
             <ProductTable product={product} refreshPage={this.fetchProduct} sorting={this.sorting} />
                 
        </div>
    )
    }
}

