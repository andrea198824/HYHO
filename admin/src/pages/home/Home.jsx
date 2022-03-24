import React, { useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userData } from "../../dummyData";
import { useState } from "react";
import { getChartData } from '../../store/actions'


import "./home.css";
import { useDispatch, useSelector } from "react-redux";



export default function Home() {
    const token = useSelector(state => state.token)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChartData(token, 2022, 1))
    }, [])

    return (
        <div className="hom">
            <FeaturedInfo />
            <Chart data={userData} title="Analisis de Mercado" grid dataKey="Total" />
            <div className="homeWidget">
                {/* <WidgetLg/> */}
                <WidgetSm />
            </div>
        </div>
    );
}
