export function addToCart(product) {
  return {
    type: '@cart/ADD',
    product,
  };
}

export function removeFromCart(id) {
  return { type: '@cart/REMOVE', id };
}

export function updateAmount(value, id) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    value,
    id,
  };
}
