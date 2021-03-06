import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createProduct, getCategories } from './apiAdmin'
import Footer from '../core/Footer'

const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shopping: '',
        quantity: '',
        photo: '',
        photo1: '',
        photo2: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const { user, token } = isAuthenticated()
    const {
        name,
        description,
        price,
        categories,
        category,
        shopping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    //load categories and set form data

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        //  let value = name === 'photo' || 'photo1' || 'photo2' ? event.target.files[0] : event.target.value
        let value = ''
        if (name === 'photo') {
            value = event.target.files[0]
            formData.set(name, value)
        }
        else if (name === 'photo1') {
            value = event.target.files[0]
            formData.set(name, value)
        }
        else if (name === 'photo2') {
            value = event.target.files[0]
            formData.set(name, value)
        } else {
            value = event.target.value
            formData.set(name, value)
        }
        // formData.set(name, value)
        console.log("name :", name, "value: ", value)


        setValues({ ...values, [name]: value })
    }
    console.log(values)
    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createProduct(user._id, token, formData)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values, name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        photo: '',
                        photo1: '',
                        photo2: '',
                        loading: false,
                        createdProduct: data.name
                    })
                }
            })
    }

    const newPostForm = () => (
        <form className='mb-3 mt-4' onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
                </label>
            </div>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo1')} type='file' name='photo1' accept='image/*' />
                </label>
            </div>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo2')} type='file' name='photo2' accept='image/*' />
                </label>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type='text' className='form-control' value={name} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea onChange={handleChange('description')} className='form-control' value={description} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input onChange={handleChange('price')} type='number' className='form-control' value={price} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select onChange={handleChange('category')} className='form-control'>
                    <option>Please Select</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select onChange={handleChange('shopping')} className='form-control'>
                    <option>Please Select</option>
                    <option value='0'>No</option>
                    <option value='1'>Yes</option>

                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input onChange={handleChange('quantity')} type='number' className='form-control' value={quantity} />
            </div>

            <button className='btn btn-outline-primary'>Create Product</button>

        </form>
    )
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created</h2>
        </div>
    )


    const showLoading = () => (
        loading && (<div className='alert alert-success'>
            <h2>Loading...</h2>
        </div>)
    )
    const goBack = () => (
        <div className='mt-2'>
            <Link to='/admin/dashboard' className='text-warning text-center'><h4>Back To Dashboard</h4></Link>
        </div>
    )

    return (
        <Layout title='Add a new Product' description={`Good Day ${user.name}, ready to add a new Product?`} className='container-fluid'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {newPostForm()}
                    {goBack()}
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export default AddProduct