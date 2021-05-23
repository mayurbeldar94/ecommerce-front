import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct, ShowImages } from './apiAdmin'
import Footer from '../core/Footer'

import ShowImage from '../core/ShowImage'


const ManageList = () => {
    const [products, setProducts] = useState([])
    const [values, setValues] = useState('')
    const [images, setImages] = useState([])


    const { user, token } = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }



    useEffect(() => {
        loadProducts()
    }, [])

    const goBack = () => (
        <div className='mt-2'>
            <Link to='/admin/dashboard' className='text-warning text-center'><h4>Back To Dashboard</h4></Link>
        </div>
    )
    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    const changeFunc = (event) => {
        setValues(event.target.value)
    }
    console.log(values)

    const getImages = (pid) => {
        ShowImages(pid).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {


            }
        })
    }



    return (
        <Layout
            title="List Products"
            description="List products"
            className="container-fluid"
        >
            <h2 className="text-center">
                list of all  {products.length} products
                <Link to='/create/product'>
                    <button className="badge badge-info badge-pill mr-10">
                        Add product
                     </button>
                </Link>
            </h2>
            <div className='form-group'>
                Select the size :
                <select className='form-control' onChange={changeFunc} value={values} >
                    <option value='-small'>small</option>
                    <option value='-medium'>medium</option>
                    <option value='-large'>large</option>
                </select>
            </div>

            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <div className='row mt-5 admin-list' key={i}>
                                <div className='col-sm-4'>
                                    <strong>Name : {p.name}{values}</strong><br />
                                    <strong>Price : ₹{p.price} /-</strong><br />
                                    <strong>Stock :{p.quantity} Item left</strong><br />
                                    <br />
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <button className="badge badge-warning badge-pill">
                                            Update
                                          </button>
                                    </Link><br />
                                    <button onClick={() => destroy(p._id)} className="badge badge-danger badge-pill">
                                        Delete
                                    </button>
                                </div>

                                <div className='col-sm-8'>
                                    <ShowImage item={p} url='product' />
                                    {getImages(p._id)}
                                </div>

                            </div>
                        ))}
                    </ul>

                </div>

            </div>
            {goBack()}
            <Footer />
        </Layout>
    );
}
export default ManageList
