import './Card.css'

function Card({img, nome, preco, descricao, estoque}) {
  return (
    <div className="container-produto">
        <img src={img} alt="" className='img-produto'/>
        <h2>{nome}</h2>
        <p>R${preco.toFixed(2)}</p>
        <p>{descricao}</p>
        <p>{estoque}</p>
    </div>
  )
}

export default Card