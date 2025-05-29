import './Card.css'

function Card({img, nome, preco, estoque, descricao}) {
  return (
    <div className="container-produto">
        <img src={img} alt="" className='img-produto'/>
        <h2>{nome}</h2>
        <p>Preço: R$ {produto.preco ? Number(produto.preco).toFixed(2) : '0.00'}</p>
        <p>{descricao}</p>
        <p>Estoque: {estoque}</p>
    </div>
  )
}

export default Card