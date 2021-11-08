
import axios from 'axios';
import React,{Component, useEffect,useState} from 'react'

import {Button} from 'semantic-ui-react'
import { CreateSales } from '../Sales/CreateSales';
import { StoreHome } from '../Store/StoreHome';
import { CreateCustomer } from './CreateCustomer';
import CustomerTable,{ Modalexa} from './CustomerTable';


//props getting from Component
export class CustomerHome extends Component {

    constructor(props){
        super(props);

//setting array and boolean to show the model

        this.state={
            customer:[],
            open:false,
            
        }
    }

   
   //getting data as soon as the page being mounted 

    componentDidMount(){
        this.showCustomer();
    }

    //setting up the modal to open and close as per the request

    openCreateCustomerModal=(value)=>{
        this.setState({
            open:value,
        })
    }

    //getting data from database 

    showCustomer =() =>{
       axios.get("/Customers/GetCustomer").then(({data})=>{
           
           this.setState({
               customer:data
           })
       }).catch((err)=>{
           console.log(err)
       })
    }
    render(){
        const {customer,open}=this.state
        

       

    return (
        <div>
            {/* button to create a new data and will open a popup modal to insert the data  */}

             <Button color="blue" className='buttonStyle' onClick={()=>this.openCreateCustomerModal(true)}>New Customer</Button>

                {/* getting create customer function from the createcustomer page and passing up some props */}

             <CreateCustomer open={open} openCreateCustomerModal={this.openCreateCustomerModal} showCustomer={this.showCustomer}  />

             {/* getting and showing customer table function from the customer table page and passing up some props */}
             <CustomerTable customer={customer} refreshPage={this.showCustomer}  />
                 
        </div>
    )
    }
}

