import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/actions';
import "./newProduct.css";

export default function NewProduct() {

    const dispatch = useDispatch()
    const token = useSelector(state => state.token)

    const [input, setInput] = useState({
        title: '',
        category: [],
        price: '',
        weight: '',
        descriptions: '',
        image: '',
        stock: '',
    })

    const [category, setCategory] = useState('')

    function hundleOnChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    function hundleInputCategory(e) {
        e.preventDefault()
        setCategory(e.target.value)
    }

    function hundleOnCategory(e) {
        setCategory(e.target.value)
        setInput({
            ...input,
            category: [...input.category, category]
        });
        setCategory('')
    }

    function hundleOnSubmit(e) {
        e.preventDefault()
        console.log(input)
        setTimeout(()=>{
            dispatch(addProduct(input, token))
        },2000)
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Nuevo Producto</h1>
            <form onSubmit={(e) => hundleOnSubmit(e)} className="addProductForm">

                <div
                    className="addProductItem">
                    <label>Nombre</label>
                    <input
                        onChange={(e) => hundleOnChange(e)}
                        name='title'
                        type="text"
                        placeholder="nombre..." />
                </div>

                <div className="addProductItem">
                    <label>Categoria</label>
                    <input onChange={(e) => hundleInputCategory(e)}   
                        onKeyPress={event => {
                            if (event.key === ',') {
                                hundleOnCategory(event)
                                
                            }
                        }}
                        value={category}
                        name='category'
                        type="text"
                        placeholder="Categoria..." />
                        
                </div>

                <div className="addProductItem">
                    <label>Precio</label>
                    <input onChange={(e) => hundleOnChange(e)}
                        name='price'
                        type="number"
                        placeholder="Precio..." />
                </div>

                <div className="addProductItem">
                    <label>Peso</label>
                    <input onChange={(e) => hundleOnChange(e)}
                        name='weight'
                        type="number"
                        placeholder="^Peso..." />
                </div>

                <div className="addProductItem">
                    <label>Descripción</label>
                    <input onChange={(e) => hundleOnChange(e)}
                        name='desciption'
                        type="number"
                        placeholder="Descripción..." />
                </div>

                <div className="addProductItem">
                    <label>Imagen</label>
                    <input type="file" id="file" />
                </div>

                <div className="addProductItem">
                    <label>Stock</label>
                    <input onChange={(e) => hundleOnChange(e)}
                        name='stock'
                        type="text"
                        placeholder="Stok..." />
                </div>

                <button
                    className="addProductButton"
                    type='submit'
                >
                    Cargar
                </button>
            </form>
        </div>
    );
}
