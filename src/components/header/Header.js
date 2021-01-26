import React, { Component } from 'react'
import './Header.css';
import CartList from '../cart-list/CartList'

class Header extends Component {

    async componentDidMount(){
        const cart = JSON.parse(localStorage.getItem('cart'))
        const currentURL = window.location.pathname
        if(cart !== null && currentURL !== '/' && currentURL !== '/carrinho-compra') {
            const cartItens = cart.length
            let totalItens = 0
            for(let i=0;i<cartItens;i++){
                const totalQtd = parseInt(cart[i]['quantidade'])
                totalItens += totalQtd
            }
            var verifyDiv = document.getElementsByClassName("cartItens");
            if(verifyDiv.length === 0) {
                var newDiv = document.getElementById("openListCart");
                var div = document.createElement('span');
                div.setAttribute('class', 'cartItens');
                div.innerHTML = ''
                div.innerHTML = totalItens;
                /*newDiv.removeChild(div)*/
                setTimeout(function(){newDiv.appendChild(div)}, 10)
            }
        }
    }
    
    render () {
        const headerHtml = []
        const currentURL = window.location.pathname
        const rotas = currentURL.split('/')
        var classe = ''
        const tipoLocal = localStorage.getItem('tipo')
        if(rotas[2] === 'normal' || tipoLocal === 'normal'){
            classe = 'normal'
        }
        if(rotas[2] === 'grama' || tipoLocal === 'grama'){
            classe = 'grama'
        }
        if(rotas[2] === 'fogo' || tipoLocal === 'fogo'){
            classe = 'fogo'
        }
        var exibeListCart = ''
        if(currentURL !== '/carrinho-compra' && currentURL !== '/finalizar-compra') {
            exibeListCart = <CartList />
        } else {
            exibeListCart = <div className='col-6'><a href={() => false}><i id='openListCart' className="bi bi-shield-lock"></i></a></div>
        }
        if(currentURL !== '/') {
            headerHtml.push(
                <header className={classe}>
                    <div className='container'>
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <a  href='/'><img src='/logoStore.png' alt='PokeStore'></img></a>
                                <div />
                            </div>
                            {exibeListCart}
                        </div>
                    </div>
                </header>
            )
        } else {
            headerHtml.push(
                <header>
                    <div className="container home">
                        <div className="row">
                            <div className="col-12">
                                <a className="home" href='/'><img src='/logoStore.png' alt='PokeStore'></img></a>
                                <div />
                            </div>
                        </div>
                    </div>
                </header>
            )
        }
        return(
            headerHtml
        )
    }
}
export default Header;