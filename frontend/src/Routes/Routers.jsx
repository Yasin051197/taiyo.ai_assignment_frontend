import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Contacts from '../components/Contacts';
import ChartsAndMaps from '../components/ChartsAndMaps';


const Routers = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
           <Route path="/" element={<Contacts />} />
           <Route path="/chartsandmaps" element={<ChartsAndMaps />} />
          </Routes>
       </BrowserRouter>
    </div>
  )
}

export default Routers