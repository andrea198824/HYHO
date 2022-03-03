import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai";
import { icons } from './icons';
import { SidebarData } from './SidebarData';
import './NavBar.css';
import SearchBar from './SearchBar';

export default function NavBar({searchWord,setSearchWord,showSidebar, sidebar, word, setWord}) {



  return (
  <div>
      <div className='navbar'>
          <div className='navbar-left-elements'>
          {/* <span>  </span> */}
            <div className='navbarTitle'>
            <Link onClick={showSidebar}>
                {icons.bars}
            </Link>
            {/* <span>  </span> */}
                
                <span>{icons.dog}</span>
                <span>Dogs App</span>
            </div>
          </div>
            <SearchBar
                word={word}
                setWord={setWord}
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                />
      </div>


        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars' onClick={showSidebar}>
                        {icons.close}
                    </Link>
                </li>
                {
                    SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
  </div>
  )
}
