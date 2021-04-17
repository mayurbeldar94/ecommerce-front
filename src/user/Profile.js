import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { read, update, updateUser } from './apiUser'
import Footer from '../core/Footer'

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const { name, email, password, error, success } = values
    const { token } = isAuthenticated()

    const init = (userId) => {
        //  console.log(userId)
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true })
            } else {
                setValues({ ...values, name: data.name, email: data.email })
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault()
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    })
                })
            }
        })

    }

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to='/cart' />
        }

    }



    const profileUpdate = (name, email, password) => (
        <form className='col-md-8 offset-md-2'>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' onChange={handleChange('name')} className='form-control' value={name} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input type='text' onChange={handleChange('email')} className='form-control' value={email} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input type='password' onChange={handleChange('password')} className='form-control' value={password} />
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )
    const goBack = () => (
        <div className='mt-2'>
            <Link to='/admin/dashboard' className='text-warning text-center'><h4>Back To Dashboard</h4></Link>
        </div>
    )

    return (
        <Layout title='Profile  ' description='Update Your profile' className='container-fluid'>
            <h2 className='p-2 mb-4 mt-2 text-center bg-info text-white'>Profile Update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
            {goBack()}
            <Footer />
        </Layout>
    )
}

export default Profile