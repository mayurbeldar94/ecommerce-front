import React from 'react'
import Layout from "./Layout"
import Footer from './Footer'

const AboutUs = () => {
    return (
        <Layout title='Home Page' description='Node React e-commerce App' className='container-fluid'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 lead">
                        <h3>About this wesite</h3>
                        <p>This is ecommerce website</p>
                        <p>SignUp first for user Account</p>
                        <p>Use can Search the product. user can sort the products by price and category from Shop page</p>
                        <p>user can add products to cards</p>
                        <p>user can purchase products using card number 4111 1111 1111 1111 date 11/22 cvv 123
                        (fake credentials)
                        </p>
                        <p>After purchasing products user can see their History form Daashboard</p>
                        <p>User also can update their profile </p>
                    </div>
                    <div className="col-sm-6 lead">
                        <h3>Admin Section 2</h3>
                        <p>Adimin can create delete update the products and category from Daashboard.</p>
                        <p>Admin can View the orders</p>
                        <p>Admin can update the order Status of the products</p>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>

    )
}

export default AboutUs;

