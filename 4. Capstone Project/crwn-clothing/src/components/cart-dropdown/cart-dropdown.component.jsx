import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    console.log(cartItems);

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => {
                    return <CartItem key={item.id} cartItem={item}/>
                })}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;
