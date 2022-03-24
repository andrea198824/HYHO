import React from 'react';
import { useState } from "react";
import "./product.css";
import FileBase from 'react-file-base64'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getDetails, putProduct } from '../../store/actions';

const Product = () => {

    const token = useSelector(state => state.token)
    const dispatch = useDispatch();
    const id = useParams().productId;
    const allProducts = useSelector(state => state.products);
    const details = useSelector(state => state.details);
    const product = details[0];

    const [state, setState] = useState({
        title: '',
        description: '',
        categories: [],
        price: '',
        stock: 0,
        image: '',
    })

    
    const [categories, setCategory] = useState('')
    
    const getBaseFile = files => {
        setState(prevState => ({ ...prevState, image: files.base64 }))  
    }

    useEffect(() => {
        if (allProducts.length) {
            dispatch(getDetails(id))          
        }
    }, [])

    useEffect(() => {
        if (allProducts.length) {
            
            setState({

                title: product ? product.title : '',
                description: product ? product.descriptions : '',
                categories: product ? product.categories : [],
                price: product ? product.price : '',
                stock: product ? product.stock : '',
                image: product ? product.image : '',

            })
        }
    }, [details])


    function hundleInputChange(e) {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    function hundleInputCategory(e) {
        e.preventDefault()
        setCategory(e.target.value)
    }

    function hundleOnSubmit(e) {
        e.preventDefault()
        console.log(id, state, token)
        dispatch(putProduct(id, state, token))
        setState({
            title: '',
            description: '',
            categories: [],
            price: '',
            stock: '',
            image: '',
        })

    }
    
    function hundleOnCategory(e) {
        setCategory(e.target.value)
        setState({
            ...state,
            categories: [...state.categories, categories.slice(0, -1)]
        });

        setCategory('')
    }

    
    if (!allProducts.length) {
        setTimeout(() => {
            dispatch(getDetails(id))
        }, 2000)
    }

    function disabled() {
        return (
            !state.title || !state.categories ||
            !state.price || !state.weight || !state.descriptions ||
            !state.image || !state.stock)
    }
     
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Producto</h1>

            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product && product.image} alt="" className="productInfoImg" />
                        <div className="productInfoBottom">
                            <span className="productName">{product && product.title}</span>
                            <h3 className="productInfoValue">$ {product && product.price}</h3>
                            <span className="productInfoKey">descripcion: </span>
                            <h5 className="productInfoValue">{product && product.descriptions}</h5>
                            
                        </div>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Categorias:  </span>
                            <span className="productInfoValue">  {product && ' '+product.categories + ' '}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product && product.id}</span>
                        </div>

                        <div className="productInfoItem">
                            <span className="productInfoKey">Stock:</span>
                            <span className="productInfoValue">{product && product.stock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">

                <form
                    onSubmit={(e) => hundleOnSubmit(e)}
                    className="productForm"
                >
                    <div className="productFormLeft">
                        <label>Titulo</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.title}
                            type="text"
                            name='title'
                            placeholder="nombre"
                            />


                        <label>Imagen</label>
                        <div >
                            <FileBase
                                name='file'
                                type='file'
                                multiple={false}
                                onDone={getBaseFile}
                            />
                        </div>


                        <label>Descripcion</label>
                        <div className="addProductItem">
                            <input
                                value={state.description}
                                onChange={(e) => hundleInputChange(e)}
                                name='description'
                                type="text"
                                placeholder="descripcion"
                            />       
                        </div>
                        
                        <label>Categoria</label>
                        <input
                            onChange={(e) => hundleInputCategory(e)}
                            value={categories}
                            type='text'
                            name="categories"
                            onKeyUp={event => {
                                if (event.key === ',') {
                                    hundleOnCategory(event)
                                }
                            }}
                        />
                        <div>
                            <label>{state.categories + ' '}</label>
                        </div>

                        <label>Precio</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.price}
                            name='price'
                            type="text"
                            placeholder="precio" />

                        <label>Stock</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.stock}
                            name='stock'
                            type="number"
                            placeholder="stock" />
                        
                            <button
                                className="productAddButton"
                                type='submit'
                            >
                                Modificar
                            </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Product


       
  