import { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import { Search } from '@material-ui/icons'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
  orderByPrice,
  filterByCategory,
  searchProducts
} from '../store/actions'
import { useNavigate } from 'react-router'

const Container = styled.div``

const Title = styled.h1`
  margin: 20px;
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`

const Filter = styled.div`
  margin: 20px;
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: '0px' })}
`

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 40%;
  height: 30%;
  align-self: center;
  justify-self: center;
`

const Input = styled.input`
  border: none;
  width: 100%;
  height: 20px;

  margin-left: 5px;

  ${mobile({ width: '50px' })}
`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 0.3rem;
  ${mobile({ margin: '10px 0px' })}
`
const Option = styled.option``

const ProductList = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const categories = useSelector(state => state.categories)

  const handleSelect = e => {
    dispatch(orderByPrice(e.target.value))
  }

  const handleSelectCategory = e => {
    dispatch(filterByCategory(e.target.value))
  }

  const onChangeSearch = async e => {
    setSearch(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()
    dispatch(searchProducts(search))
    setSearch('')
    if (search) navigate('/products')
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Destacados</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar Productos:</FilterText>
          <Select onChange={handleSelectCategory}>
            <Option value='default'>Categoria</Option>
            {categories.map(c => (
              <Option key={c.id} value={c.title}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Filter>

        <SearchContainer onSubmit={handleSearch}>
          <Input
            onChange={onChangeSearch}
            value={search}
            placeholder='Buscar...'
          />
          <Search style={{ color: 'gray', fontSize: 20 }} />
        </SearchContainer>

        <Filter>
          <FilterText>Ordenar:</FilterText>
          <Select onChange={handleSelect}>
            <Option value='asc'>Precio (asc)</Option>
            <Option value='desc'>Precio (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {}
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
