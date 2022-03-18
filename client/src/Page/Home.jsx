import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import PopularProducts from '../components/PopularProducts';
import styled from 'styled-components'

// const home = styled.div `
//   @media (max-width: 320px) {
//     display: none;
//     width: 40px;
//   }
// `

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <PopularProducts/>
      <Newsletter/>
      <Footer/> 
    </div>
  );
};

export default Home;
