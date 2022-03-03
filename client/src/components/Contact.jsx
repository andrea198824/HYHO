import React from 'react';
import { useState } from 'react';
import NavBar from './NavBar';

export default function Contact() {
        const [sidebar, setSidebar] = useState(false);
        const showSidebar = () => {
          setSidebar(!sidebar)
        };
      
        let [word, setWord] = useState('');
      
        return (
          <div>
          <div>
          <NavBar
            showSidebar={showSidebar}
            sidebar={sidebar}
            word={word}
            setWord={setWord}
           />
          </div>
          <div></div>
          </div>
        );
      }
