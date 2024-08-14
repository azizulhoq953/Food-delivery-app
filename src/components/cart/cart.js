import { useContext } from 'react';
import CartProduct from '../../components/menu/CartProduct';
import { CartContext } from '../../components/AppContext';

export default function Cart() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);

  return (
    <div>
      {cartProducts.map((product, index) => (
        <CartProduct
          key={product.id}
          product={product}
          onRemove={() => removeCartProduct(index)}
          index={index}
        />
      ))}
    </div>
  );
}
