import React, { Component } from 'react'
import './Order.css'

class Order extends Component {
    render () {
        const finishOrder = []
        const numberOrder = Math.floor(Math.random() * (8000000000 - 9000000000 + 1) + 8000000000);
        const cart = localStorage.getItem('cart')
        console.log(cart)
        const tipo = '/produtos/'+localStorage.getItem('tipo')
        if(cart === null || cart === "[]") {
            localStorage.removeItem('cart')
            finishOrder.push(
                <div className='col-sm-6'>
                    <h1>Ops!</h1>
                    <text>Seu carrinho está vazio, você precisa selecionar ao menos um Pokémon para finalizar o pedido.</text>
                    <text>Volte e continue navengando em nosso site, <a href={tipo}>clique aqui</a></text>
                    <img src='pikachu.png' alt='Obrigado, aguardamos você de volta!'></img>
                </div>
            )
        } else {
            finishOrder.push(
                <div className='col-sm-6'>
                    <h1>Obrigado!</h1>
                    <text>Seu pedido <b>{numberOrder}</b> foi registrado e será entregue em breve.</text>
                    <text>Aproveite e continue navengando em nosso site, <a href={tipo}>clique aqui</a></text>
                    <img src='pikachu.png' alt='Obrigado, aguardamos você de volta!'></img>
                </div>
            )
            localStorage.removeItem('cart')
        }

        return(
            <section className="order container d-flex justify-content-center align-items-center">
                    {finishOrder}
            </section>
        )
    }
}
export default Order;