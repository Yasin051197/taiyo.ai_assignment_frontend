import React from 'react'
import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ChartsAndMaps = () => {
  return (
    <div>
        <Heading color={'white'} p={"10px 20px"} bg={"#28686e"}>Charts and Maps</Heading>
        <Flex>
            <Grid w={"20%"} border={"1px solid red"}>
               <Box><Link to="/">Contacts</Link></Box>
               <Box><Link to="/chartsandmaps">Charts & Maps</Link></Box>
            </Grid>
            <Box  w={"80%"} border={"1px solid green"}>

            </Box>
        </Flex>
    </div>
  )
}

export default ChartsAndMaps