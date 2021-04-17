import React from 'react';
import Menu from './Menu';
import '../styles.css'


const Layout = ({ title = 'Title', description = 'Description', className, children }) => (
    <div>
        <Menu />
        <div className='jumbotron mb-0'>
            <h1>{title}</h1>
            {/*   <p className='lead'></p> */}
            <h3 className='lead'>{description}</h3>
        </div>
        <div className={className}>
            {children}
        </div>
    </div>
)

export default Layout;