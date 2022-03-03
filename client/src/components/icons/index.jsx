import * as AiFill from "react-icons/ai";
import * as Io from "react-icons/io";
import * as Fi from "react-icons/fi";
import * as Gr from "react-icons/gr";
import * as Fa from "react-icons/fa";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Md from "react-icons/md";
import loading from "./332-loader-3.gif"

export const icons = {
    home: <AiFill.AiFillHome className="icon"/>,
    close: <Ai.AiOutlineClose className="icon"/>,
    leftArrow: <Fi.FiChevronLeft className="icon"/>,
    rightArrow: <Fi.FiChevronRight className="icon"/>,
    downArrow: <Fi.FiChevronDown className="icon"/>,
    upArrow: <Fi.FiChevronUp className="icon"/>,
    add: <Md.MdAdd className="icon"/>,
    bars: <Fa.FaBars className="icon"/>,
    person: <Bs.BsFillPersonLinesFill className="icon"/>,
    dog: <Fa.FaDog className="icon"/>,
    loading: <img src={loading} alt="loading..." className="icon loading" style={{width: '100px'}}/>,
}

