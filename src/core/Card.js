import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'

const Card = ({ product,
    showViewProductButton = true,
    cartUpdate = false,
    setRun = f => f, run = undefined,
    showAddToCartButton = true,
    showRemoveProductButton = false
}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className='mr-2'>
                    <button className='btn btn-view btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirct = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return (showAddToCartButton && (
            <button onClick={addToCart} className='btn btn-add btn-outline-warning mt-2 mb-2'>
                Add To card
            </button>
        )
        )
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showStok = (quantity) => {
        return quantity > 0 ? (<span className='badge badge-primary badge-pill'>In Stok</span>
        ) : (
            <span className='badge badge-warning badge-pill'>Out of Stok</span>)
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }


    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };

    return (

        <div className='card'>
            <div className='card-header name'>{product.name}</div>
            <div className='card-body'>
                {shouldRedirct(redirect)}
                <ShowImage item={product} url='product' />
                <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
                <p className='black-10'>₹{product.price}/-</p>
                <p className='black-9'>Category: {product.category && product.category.name}</p>
                <p className='black-8'>
                    Added on {moment(product.createdAt).fromNow()}
                </p>
                {showViewButton(showViewProductButton)}
                {showStok(product.quantity)}
                <br />
                {showAddToCart(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}

            </div>
        </div>

    )
}

export default Card