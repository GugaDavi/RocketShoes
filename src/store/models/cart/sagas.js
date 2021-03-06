import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExist = yield select(state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExist ? productExist.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada excede disponibilidade do estoque');
    return;
  }

  if (productExist) {
    yield put(updateAmountSuccess(1, id));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ value, id }) {
  const stock = yield call(api.get, `/stock/${id}`);
  const productExist = yield select(state => state.cart.find(p => p.id === id));

  const stockAmount = stock.data.amount;
  const amountInCart = productExist.amount;

  if (amountInCart + value <= stockAmount) {
    yield put(updateAmountSuccess(value, id));
  } else {
    toast.error('Quantidade solicitada excede disponibilidade do estoque');
  }
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
