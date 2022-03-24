import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";


export default function FeaturedInfo() {



const token = useSelector(state => state.token)
    const [totalVentas, setTotalVentas ] = useState("");
    const [totalDonaciones, setTotalDonaciones ] = useState("");
    const [totalVentasPrev, setTotalVentasPrev ] = useState("");
    const [totalDonacionesPrev, setTotalDonacionesPrev ] = useState("");
    const [totalVentasActual, setTotalVentasActual ] = useState("");
    const [totalDonacionesActual, setTotalDonacionesActual ] = useState("");
    const [date, setDate] = useState(new Date());
    const [donationRatio, setDonationRatio] = useState(0);
    const [salesRatio, setSalesRatio] = useState(0);

    useEffect( () => {
      console.log("token  :",token)
      if (token) {
        getTotalVentas(token)
        getTotalDonaciones(token)
        getTotalVentasPrev(token)
        getTotalDonacionesPrev(token)
        getTotalVentasActual(token)
        getTotalDonacionesActual(token)
      }
  }, [token])

  useEffect(()=>{
    if(
      totalVentas &&
totalDonaciones &&
totalVentasPrev &&
totalDonacionesPrev &&
totalVentasActual &&
totalDonacionesActual
    ) {
      setDonationRatio(100*(totalDonacionesActual-totalDonacionesPrev)/totalDonacionesPrev)
      setSalesRatio(100*(totalVentasActual-totalVentasPrev)/totalVentasPrev)
    }
  })

  //TOTAL DATA
    const getTotalVentas = async (token) => {
        const response = await axios.post('/mercadopago/totalVentas',{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        // console.log("response axios :",response)
        await setTotalVentas(response.data.Total)
    }

    const getTotalDonaciones = async (token) => {
        const response = await axios.post('/totalDonation',{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        // console.log("response axios :",response)
        await setTotalDonaciones(response.data.Total)
    }

  //PREV MONTH DATA
    const getTotalVentasPrev = async (token) => {
        const response = await axios.post('/mercadopago/totalVentas',{
          year: date.getFullYear(),
          month: date.getMonth()
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        // console.log("response axios :",response)
        await setTotalVentasPrev(response.data.Total)
    }

    const getTotalDonacionesPrev = async (token) => {
        const response = await axios.post('/totalDonation',{
          year: date.getFullYear(),
          month: date.getMonth()
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        // console.log("response axios :",response)
        await setTotalDonacionesPrev(response.data.Total)
    }
  //ACTUAL MONTH DATA
    const getTotalVentasActual = async (token) => {
        const response = await axios.post('/mercadopago/totalVentas',{
          year: date.getFullYear(),
          month: date.getMonth()+1
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        // console.log("response axios :",response)
        await setTotalVentasActual(response.data.Total)
    }

    const getTotalDonacionesActual = async (token) => {
        const response = await axios.post('/totalDonation',{
          year: date.getFullYear(),
          month: date.getMonth()+1
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        // console.log("response axios :",response)
        await setTotalDonacionesActual(response.data.Total)
    }

    function financial(x) {
      return Number.parseFloat(x).toFixed(2);
    }
  // const [income, setIncome] = useState([]);
  // const [perc, setPerc] = useState(10);

   // useEffect(() => {
  //   const getIncome = async () => {
  //     try {
  //       const res = await userRequest.get("orders/income");
  //       setIncome(res.data);
  //       setPerc((res.data[1].total * 100) / res.data[0].total - 100);
  //     } catch {}
  //   };
  //   getIncome();
  // }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Dinero donado </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${financial(totalDonaciones)}</span>
          <span className="featuredMoneyRate">
          {Math.round(donationRatio * 100) / 100}% <ArrowUpward className="featuredIcon" />
            {/* %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )} */}
          </span>
        </div>
        <span className="featuredSub">Comparado con el mes anterior</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${financial(totalVentas)}</span>
          <span className="featuredMoneyRate">
          {Math.round(salesRatio * 100) / 100}% <ArrowDownward className="featuredIcon negative" />
            {/* %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )} */}
          </span>
        </div>
        <span className="featuredSub">comparado con el mes anterior</span>
      </div>
    </div>
  );
}
