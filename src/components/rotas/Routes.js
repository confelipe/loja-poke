import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Card from  '../card/Card'
import Checkout from '../checkout/Checkout'
import Order from '../order/Order'
import Index from '../index/Index'

const Routes = () => (
    <BrowserRouter>
        <Route exact path="/" component={Index} />
        <Route exact path="/produtos/:tipo?/:page?" component={Card} />
        <Route exact path="/carrinho-compra/" component={Checkout} />
        <Route exact path="/finalizar-compra/" component={Order} />
    </BrowserRouter>
);

export default Routes