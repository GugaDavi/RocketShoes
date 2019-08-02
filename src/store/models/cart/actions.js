export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return { type: '@cart/REMOVE', id };
}

export function updateAmountRequest(value, id) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    value,
    id,
  };
}

export function updateAmountSuccess(value, id) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    value,
    id,
  };
}
