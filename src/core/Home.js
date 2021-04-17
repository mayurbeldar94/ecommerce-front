import React, { useEffect, useState } from 'react';
import Layout from "./Layout"
import { getProducts } from './apiCore'
import Card from './Card'
import Search from './Search';
import Footer from './Footer'

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrial] = useState([])
    const [error, setError] = useState(false)

    const loadProductsbySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsbyArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrial(data)
            }
        })
    }

    useEffect(() => {
        loadProductsbyArrival()
        loadProductsbySell()
    }, [])

    return (
        <Layout title='Home Page' description='Node React e-commerce App' className='container-fluid'>
            <div>
                <Search />
                <h2 className='p-2 mb-4 mt-auto text-center text-white heading'>New Arrivals</h2>
            </div>
            <div className='row'>
                {productsByArrival.map((product, i) => (
                    <div key={i} className='col-4 mb-3'>
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className='p-2 mb-4 mt-4 text-center bg-info text-white'>Best Seller</h2>
            <div className='row'> {productsBySell.map((product, i) => (
                <div key={i} className='col-4 mb-3'>
                    <Card product={product} />
                </div>

            ))
            }

            </div>
            <Footer />

        </Layout>
    )
}
export default Home;