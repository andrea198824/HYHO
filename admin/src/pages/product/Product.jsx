import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";

export default function Product() {

    const[input, setInput]



  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Producto</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Crear</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/326/686/products/antartic-wear_foto_horizontal_6a1-2639b99481ff008d1b16042533048228-1024-1024.jpg" alt="" className="productInfoImg" />
                  <span className="productName">Gorra Trucker</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">vendidos:</span>
                      <span className="productInfoValue">50</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">activo:</span>
                      <span className="productInfoValue">Si</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">En stock:</span>
                      <span className="productInfoValue">no</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Nombre del Producto</label>
                  <input type="text" placeholder="nombre" />
                  <label>En Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="yes">Si</option>
                      <option value="no">No</option>
                  </select>
                  <label>Activo</label>
                  <select name="active" id="active">
                      <option value="yes">Si</option>
                      <option value="no">No</option>
                  </select>
              </div>
          </form>
      </div>
    </div>
  );
}
