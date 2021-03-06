import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import Footer from '../core/Footer'

const AdminDashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated()
    const adminLinks = () => {
        return (
            <div className='card mt-4'>
                <h4 className='card-header'>Admin Links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/product'>Create product</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/orders'>View Orders</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/products'>Manage Products</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/category'>Create Category</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/category'>Delete Category</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/list'>Product list</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className='card mt-4 mb-5'>
                <h3 className='card-header'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>
        )
    }


    return (
        <Layout title='Daashboard' description={`Good Day ${name}`} className='container-fluid'>
            <div className='row'>
                <div className='col-3'>
                    {adminLinks()}
                </div>
                <div className='col-9'>
                    {adminInfo()}
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export default AdminDashboard