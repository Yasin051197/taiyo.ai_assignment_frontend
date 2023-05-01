import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react'
import "../Css/Contact.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const getData=async()=>{
    return await axios.get("https://taiyo-ai-server.onrender.com/contacts")
}


const Contacts = () => {
    const [flag,setFlag]=useState(false)
    const [contacts,setContacts]=useState([])
    useEffect(()=>{
        getData().then((res)=>setContacts(res.data))
    },[])
const onOpen=()=>{
    setFlag(true)
}
const onClose=()=>{
    setFlag(false)
}
const handleChange=(e)=>{
    const {name,value}=e.target;
  
      setContacts({...contacts,[name]:value});
}
const handleSubmit=()=>{

}
  return (
    <div id="contact_page">
        <Heading color={'white'} p={"10px 20px"} bg={"#28686e"}>Contact Page</Heading>
        <Flex height={"500px"}>
            <Grid w={"20%"} border={"1px solid red"}>
               <Box><Link to="/">Contacts</Link></Box>
               <Box><Link to="/chartsandmaps">Charts & Maps</Link></Box>
            </Grid>
            <Box h={"100%"} w={"80%"} border={"1px solid green"}>
               {flag?<></>:<Button marginTop={"20px"} onClick={onOpen}>Create Contact</Button>}
               <Box>
                {
                    flag?
                    <div id="form">
                    <Heading onClick={onClose}>X</Heading>
                    <label >First Name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} />
                    <br />
                    <br />
                    <label>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" onChange={handleChange}/>
                    <br />
                    <br />
                    <label>Status:</label>
                    <input type="checkbox" id="status" name="status" value="active" onChange={handleChange}/>
                    <label>Active</label>
                    <input type="checkbox" id="status" name="status" value="inactive" onChange={handleChange}/>
                    <label>Inactive</label>
                    <br />
                    <br />
                    <Button onSubmit={handleSubmit}>Save Contact</Button>
                    </div>:<></>
                }
               </Box>
               {contacts.length<1?<Box margin={"auto"}  marginTop={"2%"} width={"40%"} border={"1px solid gray"}>
                     <Heading>No Contact Found Please add contact from Create Contact Button</Heading>
                </Box>:<Box>Data</Box>}
            </Box>
        </Flex>
    </div>
  )
}

export default Contacts