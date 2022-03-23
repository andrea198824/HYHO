import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'
import { addProduct } from '../../store/actions';
import "./newProduct.css";

export default function NewProduct() {

    const dispatch = useDispatch()
    const token = useSelector(state => state.token)

    const [input, setInput] = useState({
        formId:'',
        title: '',
        category: [],
        price: '',
        weight: '',
        descriptions: '',
        image: '',
        stock: '',
    })

    function disabled() {
        return (!input.formId || !input.title || !input.category ||
            !input.price || !input.weight || !input.descriptions ||
            !input.image || !input.stock)
    }


    const [category, setCategory] = useState('')

    
    const getBaseFile = files => {
        setInput(prevState => ({ ...prevState, image: files.base64 }))
      
    }

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
            category: [...input.category, category.slice(0,-1)]
        });
        
        setCategory('')
    }

    function hundleOnSubmit(e) {
        e.preventDefault()
        
        dispatch(addProduct(input, token))
        setInput({
            formId: '',
            title: '',
            category: [],
            price: '',
            weight: '',
            descriptions: '',
            image: '',
            stock: '',
        })
        
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Nuevo Producto</h1>
            <form onSubmit={(e) => hundleOnSubmit(e)} className="addProductForm">
                <div className="dosColumns">
                    <div className="space">
                        <div
                            className="addProductItem">
                            <label>Producto ID</label>
                            <input
                                onChange={(e) => hundleOnChange(e)}
                                value={input.formId}
                                name='formId'
                                type="text"
                                placeholder="Producto ID..." />
                        </div>

                        <div
                            className="addProductItem">
                            <label>Nombre</label>
                            <input
                                onChange={(e) => hundleOnChange(e)}
                                value={input.title}
                                name='title'
                                type="text"
                                placeholder="nombre..." />
                        </div>
                        <div>
                        <div className="addProductItem">
                            <label>Categoria</label>
                                <input onChange={(e) => hundleInputCategory(e)}
                                    onKeyUp={event => {
                                        if (event.key === ',') {
                                            hundleOnCategory(event)

                                        }
                                }}
                                value={category}
                                name='category'
                                type="text"
                                placeholder="Categoria..." />

                            </div>
                            <div className="category">
                                
                                <label>{input.category+' '}</label>
                            </div>
                        </div>

                        <div className="addProductItem">
                            <label>Precio</label>
                            <input onChange={(e) => hundleOnChange(e)}
                                value={input.price}
                                name='price'
                                type="number"
                                placeholder="Precio..." />
                        </div>
                    </div>
                    <div className="space">
                        <div className="addProductItem">
                            <label>Peso</label>
                            <input onChange={(e) => hundleOnChange(e)}
                                value={input.weight}
                                name='weight'
                                type="integer"
                                placeholder="Peso..." />
                        </div>

                        <div className="addProductItem">
                            <label>Descripcion</label>
                            <input onChange={(e) => hundleOnChange(e)}
                                value={input.descriptions}
                                name='descriptions'
                                type="text"
                                placeholder="Descripcion..." />
                        </div>

                        <div className="addProductItem">
                            <label>Imagen</label>
                            <div >
                                <FileBase
                                    value={input.image}
                                    name='file'
                                    type='file'
                                    multiple={false}
                                    onDone={getBaseFile}
                                />
                            </div>
                        </div>

                        <div className="addProductItem">
                            <label>Stock</label>
                            <input onChange={(e) => hundleOnChange(e)}
                                value={input.stock}
                                name='stock'
                                type="text"
                                placeholder="Stok..." />
                        </div>
                    </div>
                </div>
                <button
                    className="addProductButton"
                    type='submit'
                    disabled={disabled()}
                >
                    Cargar
                </button>
            </form>
        </div>
    );
}
