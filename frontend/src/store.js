import { createStore } from 'redux';

const reductor = (state, action) => {

        if(action.type === 'AGREGAR_PRODUCTO'){
            
            return {
                ...state,
                carrito: state.carrito.concat(action.productoElegido),
                
            }
        }else if(action.type === 'QUITAR_PRODUCTO'){

            return {
                ...state,
                carrito: state.carrito.filter(pro => pro.product.id !== action.producto.product.id)
            }
            
        }else if(action.type === 'VACIAR_CARRITO'){

            return {
                ...state,
                carrito: []
            }
            
        }else{
            return state;
        }   
}

export default createStore(reductor, {carrito: []});//estado inicial