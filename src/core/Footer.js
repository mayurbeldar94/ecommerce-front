import React, { useEffect, useState } from 'react';

const Footer = () => {

    return (
        <section className="mt-5">
            <footer class="text-center text-lg-start" style={{ "backgroundColor": "#0a4275" }}>
                <div class="container p-4">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase text-white">Contect</h5>

                            <ul class="list-unstyled mb-0">
                                <li class="text-white">Mayur Beldar</li>
                                <li className='text-white mb-2'>7720828299 </li>
                                <li class="text-white">Email -</li>
                                <li class="text-white">mbeldar94@gmail.com</li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase mb-0 text-white">Address</h5>
                            <ul class="list-unstyled mb-0">
                                <li class="text-white">Tirupati darshan apt.</li>
                                <li className='text-white'>katrap school</li>
                                <li class="text-white">katrap</li>
                                <li class="text-white">Badlapur East</li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase text-white">Services</h5>

                            <ul class="list-unstyled mb-0">
                                <li class="text-white">website devloper</li>
                                <li className='text-white'>software Devloper </li>
                                <li class="text-white">Support engineer</li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase mb-0 text-white">RETURNS</h5>

                            <ul class="list-unstyled">
                                <li class="text-white">Want to return your item?</li>
                                <li className='text-white'>please check the policy first to continue </li>
                                <li class="text-white">the return process</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center p-3 text-white" style={{ "backgroundColor": "rgba(0, 0, 0, 0.2)" }}>
                    © 2021 Copyright :
              <a className="text-white" href="https://www.facebook.com/mayur.beldar/"> Mayur Beldar</a>
                </div>
            </footer>
        </section>
    )
}

export default Footer