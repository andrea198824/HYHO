import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tablero</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Pagina principal
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Usuarios
              </li>
            </Link>
            {/* <Link to="https://hyho.vercel.app/register" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Nuevo Usuario
              </li>
            </Link> */}
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Productos
              </li>
            </Link>
            <Link to="/newProduct" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Nuevo Producto
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              ventas
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Donaciones</h3>
          <ul className="sidebarList">
          <Link to="/productos-donados" className="link" >
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Formularios donaciones de productos
            </li>
            </Link>
            </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Newsletter</h3>
          <ul className="sidebarList">
            <Link to="/newsletter" className="link">
              <li className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                Mail
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
