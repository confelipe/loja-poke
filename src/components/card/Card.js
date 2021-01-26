import React, { Component } from 'react'
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isload: false,
            pokemons: {},
            isActive: true,
            showResults: false
        }
        this.myRef = React.createRef();
    }

    async componentDidMount(){
        const currentURL = window.location.pathname
        const rotas = currentURL.split('/')
        var tipo = ''
        if(rotas[2] === 'normal') {
            tipo = '1'
        }
        if(rotas[2] === 'fogo') {
            tipo = '10'
        }
        if(rotas[2] === 'grama') {
            tipo = '12'
        }
        var url = "https://pokeapi.co/api/v2/type/"+tipo
        fetch(url)
             .then(response => response.json())
             .then(data => {
                 if(data) {
                    const pokes = data
                    this.setState({pokemons: pokes, isLoad: true})
                 }
             })
    }
    
    render() {
        /* definindo o css de acordo com o tipo */
        const currentURL = window.location.pathname
        const rotas = currentURL.split('/')
        const tipoLocal = localStorage.getItem('tipo')
        var classeSection = ''
        var tipoPoke = ''
        if(rotas[2] === 'normal' || tipoLocal === 'normal') {
            classeSection = 'cardCatalog container normal'
            localStorage.setItem('tipo', 'normal')
            tipoPoke = 'normal'
        }
        if(rotas[2] === 'fogo' || tipoLocal === 'fogo') {
            classeSection = 'cardCatalog container fogo'
            localStorage.setItem('tipo', 'fogo')
            tipoPoke = 'fogo'
        }
        if(rotas[2] === 'grama' || tipoLocal === 'grama') {
            classeSection = 'cardCatalog container grama'
            localStorage.setItem('tipo', 'grama')
            tipoPoke = 'grama'
        }
        /* definindo o css de acordo com o tipo */
        const list = []
        const pagination = []
        const data = this.state.pokemons
        const isLoaded = this.state.isLoad
        
        const {page} = this.props.match.params
        let isPagination = page
        if(typeof isPagination === "undefined") {
            isPagination = 1
        }
        
        let b = isPagination * 12
        let position = b - 12
        if(isLoaded === true) {
            let totalPagination = data['pokemon'].length / 12
            for(let i=position;i<b;i++){
                var idPokemon = data['pokemon'][i]['pokemon']['url'].split('/')
                idPokemon = idPokemon[6]
                var precoPokemon = idPokemon * 7
                var namePokemon = data['pokemon'][i]['pokemon']['name']
                const isActive = this.state.isActive;
                const myRef = this.myRef
                const formato = {minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'}
                var src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+idPokemon+".png"
                list.push(
                    <div className="col-xs">
                        <div className="card" style={{width: '18rem'}}>
                            <img className="img-fluid img-thumbnail" src={src} alt="Falha ao carregar imagem"></img>
                            <div className='card-body'>
                                <h5 className="card-title">{namePokemon}</h5>
                                <div className="row justify-content-between">
                                    <div className="col-6">
                                        <p className="card-text"><b>{precoPokemon.toLocaleString('pt-BR', formato)}</b></p>
                                    </div>
                                    <div id='clickEvent' className={isActive ? "app" : null}>
                                        <a href={() => false} ref={myRef} className="btn btn-secondary" onClick={this.addCart.bind(this,namePokemon,1,precoPokemon,idPokemon)}>
                                            Add cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                )
            }
            if(parseInt(isPagination) === 1) {
                pagination.push(
                    <li className="page-item disabled"><a href={() => false} className="page-link">Anterior</a></li> 
                )
            } else {
                const previousPage = parseInt(isPagination) - 1
                const rootUrl = '/produtos/'+tipoPoke+'/'
                const previousPageFull = rootUrl.concat(previousPage.toString())
                pagination.push(
                    <li className="page-item"><a className="page-link" href={previousPageFull}>Anterior</a></li> 
                )
            }
            var classe = ''
            for(let i=1;i<parseInt(totalPagination) + 1;i++) {
                if(parseInt(i) === parseInt(isPagination)) {
                    classe = 'page-item active'
                } else {
                    classe = 'page-item'
                }
                var paginationIs = '/produtos/'+tipoPoke+'/'+i
                pagination.push(
                    <li className={classe}><a className="page-link" href={paginationIs}>{i}</a></li> 
                )
            }
            if(isPagination < parseInt(totalPagination)) {
                const nextPage = parseInt(isPagination) + 1
                const rootUrl = '/produtos/'+tipoPoke+'/'
                const nextPageFull = rootUrl.concat(nextPage.toString())
                pagination.push(
                    <li className="page-item"><a className="page-link" href={nextPageFull}>Próximo</a></li> 
                ) 
            }
            if(parseInt(isPagination) === parseInt(totalPagination)) {
                pagination.push(
                    <li className="page-item disabled"><a className="page-link" href={() => false}>Próximo</a></li> 
                )
            } 
        }
        return(
                <section className={classeSection}>
                    <div className="row justify-content-around">
                        {list}
                    </div>
                    <div className="row justify-content-around">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {pagination}
                            </ul>
                        </nav>
                    </div>
                </section>
            )
    }
    addCart(produto, qtd, valor, id) {

        const cart = []
        if(localStorage.getItem('cart')  != null) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            var pos = cart.find(cart => cart.id === id)
            cart = cart.filter(function(newCart){
                return newCart.id !== id
            })
            if(pos) {
                const newQtd = parseInt(pos['quantidade']) + qtd
                cart.push({
                    id: id,
                    quantidade: newQtd,
                    preco: valor,
                    nomeItem: produto
                })
            } else {
                cart.push({
                    id: id,
                    quantidade: qtd,
                    preco: valor,
                    nomeItem: produto
                })
            }
            let totalItens = 0
            localStorage.setItem('cart', JSON.stringify(cart))
            cart = JSON.parse(localStorage.getItem('cart'))
            const cartItens = cart.length
            let newDiv = []
            let div = []
            for(let i=0;i<cartItens;i++){
                const totalQtd = parseInt(cart[i]['quantidade'])
                totalItens += totalQtd
            }
            var verifyDiv = document.getElementsByClassName("cartItens");
            if(verifyDiv.length === 0) {
                newDiv = document.getElementById("openListCart");
                div = document.createElement('span');
                div.setAttribute('class', 'cartItens');
                div.innerHTML = ''
                div.innerHTML = totalItens;
                /*newDiv.removeChild(div)*/
                newDiv.appendChild(div)
            } else {
                newDiv = document.getElementById("openListCart");
                div = document.createElement('span');
                div.setAttribute('class', 'cartItens');
                div.innerHTML = ''
                div.innerHTML = totalItens;
                newDiv.removeChild(newDiv.childNodes[0])
                newDiv.appendChild(div)
            }
        } else {
            cart.push({
                id: id,
                quantidade: qtd,
                preco: valor,
                nomeItem: produto
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            var newDiv = document.getElementById("openListCart");
            var div = document.createElement('span');
            div.setAttribute('class', 'cartItens');
            div.innerHTML = qtd;
            newDiv.appendChild(div)
        }
    }
}
export default Card;