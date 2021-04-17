import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { deleteCategory, getCategories } from './apiAdmin'
import Footer from '../core/Footer'

const DeleteCategory = () => {
    const [category, setCategory] = useState([])
    const { user, token } = isAuthenticated()

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setCategory(data)
            }
        })
    }

    const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadCategories()
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const goBack = () => (
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning text-center'><h4>Back To Dashboard</h4></Link>
        </div>
    )

    return (
        <Layout title='Delete Category Page' description='Delete unwanted Categories' className='container-fluid'>

            <div className='row'>
                <div className='col-10 ml-5'>
                    <h2 className='p-2 mb-4 text-white text-center mt-4 heading'>Delete Category</h2>
                    <hr />
                    <ul className='list-group'>
                        {category.map((c, i) => (
                            <li
                                key={i}
                                className="list-group-item">
                                <h4 className='ml-10'>{c.name}</h4>
                                <button
                                    onClick={() => destroy(c._id)}
                                    className="badge badge-danger badge-pill">
                                    Delete Category
                                </button>
                            </li>
                        ))}
                    </ul>
                    {goBack()}
                    <br />

                </div>

            </div>
            <Footer />
        </Layout>
    )

}

export default DeleteCategory