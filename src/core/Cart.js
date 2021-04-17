import React, { useEffect, useState } from 'react';
import Layout from "./Layout"
import { getCart } from './cartHelpers';
import { Link } from 'react-router-dom';
import Card from './Card'
import Checkout from './Checkout';
import Footer from './Footer'


const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(() => {
        console.log('MAX DEPTH ...');
        setItems(getCart())

    }, [run])




    const showItems = items => {
        return (<div>
            <h2>Your cart has {`${items.length} items`}</h2>
            <hr />
            {items.map((product, i) => (<Card key={i} product={product} setRun={setRun}
                run={run} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} />))}
        </div>)

    }

    const noItemsMessage = () => {
        return (<h2>
            Your Cart is Empty. <br /> <Link to='/shop'>continue shopping</Link>
        </h2>)
    }

    return (
        <Layout title='Shopping Cart' description='Manage your cart item, Add remove checkout or continue shopping' className='container-fluid'>
            <div className='row'>
                <div className='col-6 mt-3'>
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>


                <div className='col-6 mt-4'>
                    <h2 className='mb-4'>Your cart summury</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export default Cart
