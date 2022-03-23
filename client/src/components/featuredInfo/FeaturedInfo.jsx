import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";


export default function FeaturedInfo() {



const token = useSelector(state => state.token)
    const [respuesta, setRespuesta ] = useState("")
    const {isLoading} = useAuth0()
    useEffect( () => {
      console.log("token  :",token)
      if (token) peticion(token)
  }, [token])

  useEffect( () => {
    console.log("respuesta  :",respuesta)
  })

    const peticion = async (token) => {
        const response = await axios.post('/mercadopago/totalVentas',{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },  
        })
        console.log("response axios :",response)
        await setRespuesta(response.data.Total)
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
          <span className="featuredMoney">$5000</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
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
          <span className="featuredMoney">$400</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
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
