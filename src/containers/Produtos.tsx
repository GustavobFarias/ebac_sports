import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import * as S from './styles'
import { useGetProdutosQuery } from '../services/api'
import { useSelector, useDispatch } from 'react-redux'
import { favoritar } from '../store/reducers/favoritos'
import { RootReducer } from '../store'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()

  const dispatch = useDispatch()
  const favoritos = useSelector(
    (state: RootReducer) => state.favorito.favoritos
  )

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((favorito) => favorito.id === produto.id)
  }

  const handleFavoritar = (produto: ProdutoType) => {
    dispatch(favoritar(produto))
  }

  if (isLoading) {
    return <h2>Carregando...</h2>
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            favoritar={handleFavoritar}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
