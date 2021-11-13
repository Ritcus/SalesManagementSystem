
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
            order:"ASC",
            orderD:"ASCD"
            
        }
    }

    sorting =(col, name)=>{
        if (this.state.order ==="ASC"){
          const sorted =[...this.state.sales].sort((a,b)=>
          a[col].name> b[col].name? 1:-1);
          this.setState({sales: sorted});
          this.setState({order:"DSC"});
        }
  
        if (this.state.order ==="DSC"){
          const sorted =[...this.state.sales].sort((a,b)=>
          a[col].name< b[col].name? 1:-1);
          this.setState({sales:sorted});
          this.setState({order:"ASC"});
        }
        
      }

      sortingDate =(col)=>{
        if (this.state.orderD ==="ASCD"){
          const sorted =[...this.state.sales].sort((a,b)=>
          a[col]> b[col]? 1:-1);
          this.setState({sales: sorted});
          this.setState({orderD:"DSCD"});
        }
  
        if (this.state.orderD ==="DSCD"){
          const sorted =[...this.state.sales].sort((a,b)=>
          a[col]< b[col]? 1:-1);
          this.setState({sales:sorted});
          this.setState({orderD:"ASCD"});
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
             <SalesTable sales={sales} refreshPage={this.fetchSales} customer={customer} product={product} store={store} sorting={this.sorting} sortingDate={this.sortingDate}  />
                 
        </div>
    )
    }
}

