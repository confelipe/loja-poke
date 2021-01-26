import React, { Component } from 'react'
import './Checkout.css';

class Card extends Component {
    removeCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart = cart.filter(function(newCart){
            return newCart.id !== id
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        document.location.reload(true);
    }
    render() {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart === null || cart === "[]") {
            window.history.back();
        }
        const itemsCart = []
        const lengthCart = cart.length
        const formato = {minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'}
        let precoTotalCart = 0
        for(let i=0;i<lengthCart;i++){
            const src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+cart[i]['id']+".png"
            let precoTotalItem = parseInt(cart[i]['preco']) * parseInt(cart[i]['quantidade'])
            precoTotalCart += precoTotalItem
            const idPokemon = cart[i]['id']
            itemsCart.push(
                <div className='row'>
                    <div className='col-2 image'>
                        <img src={src} alt={cart[i]['nomeItem']} ></img>
                    </div>
                    <div className='col-6'>
                        <span><b>{cart[i]['nomeItem']}</b></span>
                    </div>
                    <div className='col-2'>
                        <i>{cart[i]['quantidade']}</i>
                    </div>
                    <div className='col-2'>
                        {precoTotalItem.toLocaleString('pt-BR', formato)}
                        <span><i onClick={this.removeCart.bind('this',idPokemon)} class="bi bi-trash"></i></span>
                    </div>
                    <hr></hr>
                </div>
            )
        } 
        const currentURL = window.location.pathname
        const rotas = currentURL.split('/')
        var classe = ''
        const tipoLocal = localStorage.getItem('tipo')
        if(rotas[2] === 'normal' || tipoLocal === 'normal'){
            classe = 'checkout container normal'
        }
        if(rotas[2] === 'grama' || tipoLocal === 'grama'){
            classe = 'checkout container grama'
        }
        if(rotas[2] === 'fogo' || tipoLocal === 'fogo'){
            classe = 'checkout container fogo'
        }
        return(
            <section className={classe}>
                <div className='row'>
                    <div className='col-12'>
                        <h3>meu carrinho</h3>
                    </div>
                </div>
                <div className='row'>
                    <div class='col-8'>
                        Produto
                    </div>
                    <div class='col-2'>
                        Quantidade
                    </div>
                    <div class='col-1'>
                        Preço
                    </div>
                    <div class='col-1'>
                        Remover
                    </div>
                </div>
                <hr></hr>
                {itemsCart}
                <div className='row'>
                    <div className='col-12 totalPedido'>
                        Total do pedido: <b>{precoTotalCart.toLocaleString('pt-BR', formato)}</b>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 buttonConcluir'>
                        <a href='/finalizar-compra' className='btn btn-secondary'>Concluir pedido</a>
                    </div>
                </div>
            </section>
        )
    }
}
export default Card;