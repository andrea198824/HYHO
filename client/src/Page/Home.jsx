import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
import PopularProducts from '../components/PopularProducts';
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import Chart from "../components/chart/Chart";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Chart title="Analisis de Mercado" grid dataKey="Active User"/>
      <FeaturedInfo />
      <Slider />
      <Categories />
      <PopularProducts />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home
