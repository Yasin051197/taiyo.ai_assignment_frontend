import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Chart from 'chart.js/auto';

const ChartsAndMaps = () => {
  const [chartData, setChartData] = useState({});
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    const fetchChartData = async () => {
      const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      const data = response.data;

      const chartData = {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: 'COVID-19 Cases',
            data: Object.values(data.cases),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      setChartData(chartData);
    };
    const fetchCountryData = async () => {
      const response = await axios.get('https://disease.sh/v3/covid-19/countries');
      const data = response.data;

      const countryData = data.map((country) => ({
        name: country.country,
        lat: country.countryInfo.lat,
        long: country.countryInfo.long,
        active: country.active,
        recovered: country.recovered,
        deaths: country.deaths,
      }));

      setCountryData(countryData);
    };
    fetchChartData();
    fetchCountryData();
  }, []);

  useEffect(() => {
    const chartConfig = {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
        },
      },
    };
    const myChart = new Chart(document.getElementById('myChart'), chartConfig);
    return () => {
      myChart.destroy();
    };
  }, [chartData]);
  return (
    <div>
        <Heading color={'white'} p={"10px 20px"} bg={"#28686e"}>Charts and Maps</Heading>
        <Flex>
        {window.innerWidth>900?<Grid padding={"10px"} w={"19%"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
               <Box><Link style={{textDecoration:"none",fontSize:"20px",fontWeight:"bold"}} to="/">Contacts</Link></Box>
               <Box><Link style={{textDecoration:"none",fontSize:"20px",fontWeight:"bold"}} to="/chartsandmaps">Charts & Maps</Link></Box>
            </Grid>:<Flex justifyContent={"space-evenly"} w={"100%"} margin={'auto'} marginBottom={"20px"} p={"10px 0px"}  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
               <Box><Link style={{textDecoration:"none",fontSize:"20px",fontWeight:"bold"}} to="/">Contacts</Link></Box>
               <Box><Link style={{textDecoration:"none",fontSize:"20px",fontWeight:"bold"}} to="/chartsandmaps">Charts & Maps</Link></Box>
            </Flex>}
            <Box padding={"30px"} margin={'auto'}  w={"79%"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} border={"1px solid gray"}>
            <h1>COVID-19 Dashboard</h1>
          <Box><canvas id="myChart" width="100%" height="40px"></canvas></Box>
          <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px' }}></MapContainer>
            </Box>
        </Flex>
    </div>
  )
}

export default ChartsAndMaps