
import axios from 'axios';
import React,{Component, useEffect,useState} from 'react'

import {Button} from 'semantic-ui-react'


import { CreateStore } from './CreateStore';

import StoreTable from './StoreTable';

//props getting from Component
export class StoreHome extends Component {

    constructor(props){
        super(props);

//setting array and boolean to show the model

        this.state={
            store:[],
            open:false,
            
        }
    }

   
   //getting data as soon as the page being mounted 

    componentDidMount(){
        this.fetchStore();
    }

    //setting up the modal to open and close as per the request

    openCreateStoreModal=(value)=>{
        this.setState({
            open:value,
        })
    }

    //getting data from database 

    fetchStore =() =>{
       axios.get("/Stores/GetStore").then(({data})=>{
           this.setState({
               store:data,
            });
       }).catch((err)=>{
           console.log(err)
       })
    }
    render(){
        const {store,open}=this.state
        

       

    return (
        <div>
            {/* button to create a new data and will open a popup modal to insert the data  */}

             <Button color="blue" className='buttonStyle' onClick={()=>this.openCreateStoreModal(true)}>New Store</Button>

                {/* getting create customer function from the createcustomer page and passing up some props */}

             <CreateStore open={open} openCreateStoreModal={this.openCreateStoreModal} fetchStore={this.fetchStore}  />

             {/* getting and showing customer table function from the customer table page and passing up some props */}
             <StoreTable store={store} refreshPage={this.fetchStore}  />
                 
        </div>
    )
    }
}

