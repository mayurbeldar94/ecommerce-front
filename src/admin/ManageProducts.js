import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'
import Footer from '../core/Footer'


const ManageProducts = () => {
    const [products, setProducts] = useState([])
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

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
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



    return (
        <Layout
            title="Manage Products"
            description="Here you can delete and update products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center" >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <button className="badge badge-warning badge-pill">
                                        Update
                                    </button>
                                </Link>
                                <button
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>

            </div>
            {goBack()}
            <Footer />
        </Layout>
    );
}
export default ManageProducts
