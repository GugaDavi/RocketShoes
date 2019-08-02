import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(item => item.id === action.id);

        draft.splice(productIndex, 1);
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.findIndex(item => item.id === action.id);

        if (action.value === 1) {
          draft[productIndex].amount += 1;
        } else {
          draft[productIndex].amount -= 1;
        }

        if (draft[productIndex].amount === 0) {
          draft.splice(productIndex, 1);
        }
      });
    default:
      return state;
  }
}
