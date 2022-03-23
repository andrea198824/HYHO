import React from 'react';
import "./product.css";
// import Chart from "../../components/chart/Chart";
// import {productData} from "../../dummyData";
// import { Publish } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getDetails } from '../../store/actions';



const Product = () => {

    const dispatch = useDispatch();
    const id = useParams().productId;
    const allProducts = useSelector(state => state.products);
    const details = useSelector(state => state.details);
    const product = details[0];
    

    useEffect(() => {
        if (allProducts.length) {
            dispatch(getDetails(id))
        console.log("usua 🎋: ",id);
        console.log("producto 🎎: ",product);;
        }
    }, [])

    if (!allProducts.length) {
        setTimeout(() => {
            dispatch(getDetails(id))
        }, 2000)
    }

    return (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Producto</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Modificar</button>
            </Link>
          </div>
          <div className="productTop">
              <div className="productTopRight">
                  <div className="productInfoTop">
                      <img src={product && product.image} alt="" className="productInfoImg" />
                      <div className="productInfoBottom">
                        <span className="productName">{product && product.title}</span>
                        <span className="productInfoKey">descripcion:</span>
                        <h5 className="productInfoValue">{product && product.descriptions}</h5>
                     </div>
                  </div>
                  <div className="productInfoBottom">
                      <div className="productInfoItem">
                          <span className="productInfoKey">id:</span>
                          <span className="productInfoValue">{product && product.id}</span>
                      </div>
                      {/* <div className="productInfoItem">
                          <span className="productInfoKey">vendidos:</span>
                          <span className="productInfoValue">50</span>
                      </div> */}
                      {/* <div className="productInfoItem">
                          <span className="productInfoKey">activo:</span>
                          <span className="productInfoValue">Si</span>
                      </div> */}
                      <div className="productInfoItem">
                          <span className="productInfoKey">Stock:</span>
                          <span className="productInfoValue">{product && product.stock}</span>
                      </div>
                  </div>
              </div>
          </div>
          <div className="productBottom">
              <form className="productForm">
                  <div className="productFormLeft">
                      <label>Titulo</label>
                      <input type="text" placeholder="nombre" />
                      <label>Imagen</label>
                      <input type="img" placeholder="imagen" />
                      <label>Descripcion</label>
                      <input type="text" placeholder="descripcion" />
                      <label>Categoria</label>
                      <input type="text" placeholder="categoria" />
                      <label>Precio</label>
                      <input type="text" placeholder="precio" />
                      <label>Stock</label>
                      <input type="text" placeholder="stock" />
                      {/* <label>Activo</label>
                      <select name="active" id="active">
                          <option value="yes">Si</option>
                          <option value="no">No</option>
                      </select> */}
                  </div>
              </form>
          </div>
        </div>
      );
    }

export default Product


       
  