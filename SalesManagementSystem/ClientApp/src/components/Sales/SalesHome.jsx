
import axios from 'axios';
import React,{Component, useEffect,useState} from 'react'

import {Button} from 'semantic-ui-react'
import { CreateSales } from './CreateSales';



import SalesTable from './SalesTable';


//props getting from Component
export class SalesHome extends Component {

    constructor(props){
        super(props);

//setting array and boolean to show the model

        this.state={
            sales:[],
            customer:[],
            product:[],
            store:[],
            open:false,
            
        }
    }

   
   //getting data as soon as the page being mounted 

    componentDidMount(){
        this.fetchSales();
        this.fetchCustomer();
        this.fetchProduct();
        this.fetchStore();
    }

    //setting up the modal to open and close as per the request

    openCreateSalesModal=(value)=>{
        this.setState({
            open:value,
        })
    }

    fetchCustomer =() =>{
        axios.get("/Customers/GetCustomer").then(({data})=>{
            
            this.setState({
                customer:data
            })
        }).catch((err)=>{
            console.log(err)
        })
     }

     fetchProduct =() =>{
        axios.get("/Products/GetProduct").then(({data})=>{
            this.setState({
                product:data,
             });
        }).catch((err)=>{
            console.log(err)
        })
     }

     fetchStore =() =>{
        axios.get("/Stores/GetStore").then(({data})=>{
            this.setState({
                store:data,
             });
        }).catch((err)=>{
            console.log(err)
        })
     }


    //getting data from database 

    fetchSales =() =>{
       axios.get("/Sales/GetSales").then(({data})=>{
           
           this.setState({
               sales:data,
            });
       }).catch((err)=>{
           console.log(err)
       })
    }
    render(){
        const {sales,open,customer,product,store}=this.state

       

    return (
        <div>
            {/* button to create a new data and will open a popup modal to insert the data  */}

             <Button color="blue" className='buttonStyle' onClick={()=>this.openCreateSalesModal(true)}>New Sale</Button>

                {/* getting create customer function from the createcustomer page and passing up some props */}

             <CreateSales open={open} customer={customer} product={product} store={store}  openCreateSalesModal={this.openCreateSalesModal} fetchSales={this.fetchSales} sales={sales} />

             {/* getting and showing customer table function from the customer table page and passing up some props */}
             <SalesTable sales={sales} refreshPage={this.fetchSales} customer={customer} product={product} store={store}  />
                 
        </div>
    )
    }
}

