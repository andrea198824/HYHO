import NavBar from './NavBar';
import { useDispatch, useSelector } from "react-redux";
import React , {useState, useEffect}from 'react';
import { getAllTemperaments, getAllBreeds, setBreeds, setTemperaments} from "../actions";
import Form from './Form';


export default function Create() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar)
  };

  const dispatch = useDispatch()
    useEffect(() => {
    dispatch(getAllTemperaments())
    dispatch(getAllBreeds())
}, [])

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
    <Form></Form>
    </div>
  );
}