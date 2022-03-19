import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userData } from "../../dummyData";
import {useAuth0 } from '@auth0/auth0-react';
import { getToken } from "../../store/actions";
import { useDispatch } from "react-redux";
import "./home.css";


export default function Home() {

const dispatch = useDispatch();
const {getAccessTokenSilently, isLoading} = useAuth0();
if (!isLoading) {
  getAccessTokenSilently()
  .then( (res)=> dispatch(getToken(res)))
} 

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="Analisis de Mercado" grid dataKey="Active User"/>
      <div className="homeWidgets">
        {/* <WidgetLg/> */}
        <WidgetSm/>
      </div>
    </div>
  );
}
