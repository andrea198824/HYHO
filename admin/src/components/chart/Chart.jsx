import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

const Chart = ({ grid=grid }) => {
  const token = useSelector(state => state.token)
  let [date, setDate] = useState(new Date());
  let [months, setMonths] = useState([]);
  let [data2, setData2] = useState([]);

  useEffect(()=>{
    setMonths(setMonthsArray(date))
      // console.log("months :",months)
  },[token])

  useEffect(()=>{
    if(token && months.length) {
      createData(token)
    }
   },[token, months])

   useEffect(()=>{
    console.log("data2    :",data2)
   },[data2])
  
  function setMonthsArray(today){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  let toReturn = []
  let yearMinus = 0
  let thisMonth = today.getMonth()
  for (let i = thisMonth; i < 24; i--) {
    if (!monthNames[i]) i = 11
    if(i == 11) yearMinus = -1
    	toReturn.push({
        month: monthNames[i],
        monthNumber: i,
        yearMinus})
    if (monthNames.length == toReturn.length) break
  }
  if (thisMonth == 11){
    for (let i = 0; i < toReturn.length; i++) {
      toReturn[i].yearMinus = 0
    }
  }
  return toReturn
  }

  const getTotalVentas = async (year, month, token) => {
    const response = await axios.post('/mercadopago/totalVentas',{
      year: year,
      month: month
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },  
    })
    // console.log("response axios :",response)
    return response.data.Total
}

const getTotalDonaciones = async (year, month, token) => {
  const response = await axios.post('/totalDonation',{
    year: year,
    month: month
  }, {
      headers: {
          Authorization: `Bearer ${token}`,
      },  
  })
  // console.log("response axios :",response)
  return response.data.Total
}

const createData = async (token) => {
  let ventas
  let donaciones
  let total
  let data2 = []
  for (let i = 0; i < months.length; i++) {
    ventas = await getTotalVentas(date.getFullYear()+months[i].yearMinus,months[i].monthNumber, token);
    donaciones = await getTotalDonaciones(date.getFullYear()+months[i].yearMinus,months[i].monthNumber, token);
    total = ventas + donaciones;
    await data2.push({
      month: months[i].month,
      monthNumber: months[i].monthNumber,
      ventas,
      donaciones,
      total
    })
  }
  // console.log("toReturn :",data2)
  await setData2(data2.reverse())
 }
  

  let title="Analisis de Mercado"
  let dataKey="Active User"
    return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data2}>
          <XAxis dataKey="month" stroke="#6a7c6e" />
          <Line type="monotone" dataKey="ventas" stroke="#6a7c6e" />
          <Line type="monotone" dataKey="donaciones" stroke="#08EF00" />
          <Line type="monotone" dataKey="total" stroke="#0511C3" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#6a7c6e" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
  </div>
  )
}

export default Chart



