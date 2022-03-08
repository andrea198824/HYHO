import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nuevo Producto</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Imagen</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Nombre</label>
          <input type="text" placeholder="nombre..." />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="..." />
        </div>
        <div className="addProductItem">
          <label>Activo</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Cargar</button>
      </form>
    </div>
  );
}
