import React from 'react'
import './CartList.css'
const CartList = () => {
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => {
    var newDiv = []
    var div = []
    if(showResults === false) {
        setShowResults(true)
        newDiv = document.getElementById("root");
        div = document.createElement('div');
        div.setAttribute('class', 'tudo');
        newDiv.appendChild(div)
        document.getElementById("closedCart").classList.add("show");
    } else {
        setShowResults(false)
        document.getElementById("closedCart").classList.remove("show");
        newDiv = document.getElementById("root");
        newDiv.removeChild(newDiv.childNodes[2])
    }    
  }
  return (
    <div className='col-6'>
        <div className='col-6'>
            <a href={() => false} onClick={onClick}><i id="openListCart" className="bi bi-basket"></i></a>
        </div>
        <div className='col-10'>
            <span id="closedCart" onClick={onClick}><i className="bi bi-x-square"></i></span>
            { showResults ? <Results /> : null }
        </div>
    </div>
  )
}

const Results = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const cartList = []
    const resumCart = []
    let totalCart = 0
    const formato = {minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'}
    if(cart != null) {
        for(let itens=0;itens<cart.length;itens++) {
            const src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+cart[itens]['id']+'.png'
            const valorItem = parseInt(cart[itens]['preco']) * parseInt(cart[itens]['quantidade'] )
            cartList.push(
                <div class='row'>
                    <div className='col-2'>
                        <img src={src} alt='Foto do produto' />
                    </div>
                    <div className='col-5'>
                        <b>{cart[itens]['nomeItem']}</b>
                        <i>Quantidade: {cart[itens]['quantidade']}</i>
                    </div>
                    <div className='col-5'>
                        <span>{valorItem.toLocaleString('pt-BR', formato)}</span>
                    </div>
                    <hr></hr>
               </div>
            )
            let totalItem = parseInt(cart[itens]['preco']) * parseInt(cart[itens]['quantidade'])
            totalCart += totalItem
        }
        resumCart.push(
            <div className='row totalItens'>
                <div className='col-12'>
                    <text>Total dos itens:</text> <b>{totalCart.toLocaleString('pt-BR', formato)}</b>
                </div>
                <div className='col-12'>
                    <a href='/carrinho-compra' className='btn btn-secondary'>Capturar Pokémon</a>
                </div>
            </div>
        )
    } else {
        resumCart.push(
            <div className='row totalItens'>
                <hr></hr>
                <div className='col-12'>
                    <p>Seu carrinho esta vazio.<br></br>Volte e capture alguns Pokémon!</p>
                </div>
            </div>
        )
    }
    return (
    <div id="results" className="col-xl-10">
        <div className='row'>
            <div className='col-12'>
                <h4>meu carrinho</h4>
            </div>
        </div>
        {cartList}
        {resumCart}
    </div>
)}

export default CartList;