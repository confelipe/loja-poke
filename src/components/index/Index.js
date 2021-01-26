import React, { Component } from 'react'
import './Index.css'

class Index extends Component {
    render () {
        localStorage.removeItem('tipo')
        return(
            <section className="index container">
                    <div className='row'>
                        <div className='col-12'>
                            <h1>Seja bem vindo!</h1>
                            <p>Vamos capturar alguns Pokémon? Escolha um dos tipos abaixo.</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'><a href='/produtos/normal/'><img alt='Tipo normal' id="tiposPokemon" className='img-fluid img-thumbnail' src='/imagem/normal.png'></img></a></div>
                        <div className='col-4'><a href='/produtos/fogo/'><img alt='Tipo fogo' id="tiposPokemon" className='img-fluid img-thumbnail' src='/imagem/fogo.png'></img></a></div>
                        <div className='col-4'><a href='/produtos/grama/'><img alt='Tipo grama' id="tiposPokemon" className='img-fluid img-thumbnail' src='/imagem/grama.png'></img></a></div>
                    </div>
            </section>
        )
    }
}
export default Index;