import "./widgetTotalSales.css";

export default function WidgetProductSales() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Ventas</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Usuario</th>
          <th className="widgetLgTh">Fecha</th>
          <th className="widgetLgTh">Producto</th>
          <th className="widgetLgTh">Monto</th>
          <th className="widgetLgTh">Estado</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Mafalda Quino</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgProduct">Moto</td>
          <td className="widgetLgAmount">$2500.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Mafalda Quino</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgProduct">LED 52"</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Mafalda Quino</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgProduct">Camara Nikon</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Mafalda Quino</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgProduct">Remera</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Mafalda Quino</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgProduct">Sommier</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
      </table>
    </div>
  );
}
