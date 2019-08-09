import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';

import * as CartActions from '../../store/models/cart/actions';

import { ProductList } from './styles';
import { formatPrice } from '../../util/format';

export default function Home({ addToCartRequest }) {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sum, product) => {
      sum[product.id] = product.amount;

      return sum;
    }, {})
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }
  return (
    <ProductList>
      {products.map(item => (
        <li key={item.id}>
          <img src={item.image} alt={item.title} />
          <strong>{item.title}</strong>
          <span>{item.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(item.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[item.id] || 0}
            </div>
            <span>Adicionar ao Carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
