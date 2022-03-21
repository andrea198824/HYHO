import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userData } from "../../dummyData";

import "./home.css";



export default function Home() {

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
