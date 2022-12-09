const reducer= (state,action)=>{
    if(action.type==='CLEAR_CART'){
        return {...state,cart:[]}
    }
    // if(action.type==='REMOVE_ONE_ITEM'){
    //     // console.log(state)
    //         return{ ...state ,cart : state.cart.filter((cartItem)=>{
    //             // console.log(action.payload)
    //             return cartItem.id !== action.payload}
    //             )}
    // }

    if(action.type === 'REMOVE_ONE_ITEM'){
        let tempCart=state.cart.filter((cartItem)=>{
            return cartItem.id !== action.payload
        })
        return {...state, cart : tempCart}
    }
 
    if (action.type==='INCREASE'){
        let tempCart=state.cart.map((cartItem)=>{
            // console.log(state)
         if(cartItem.id === action.payload){
           return{...cartItem,amount: cartItem.amount +1}
         }
         return cartItem
        })

        return {...state, cart: tempCart}
     }

    if (action.type==='DECREASE'){
        let tempCart=state.cart.map((cartItem)=>{
         
         if(cartItem.id === action.payload){
            
           return{...cartItem,amount: cartItem.amount -1}
         }
         return cartItem
        }).map((cartItem)=>{
          if(cartItem.amount < 2){
             
               cartItem.amount =1 
               return cartItem
          }
           return cartItem
        })
        //if we want to remove item if quantity less than zero
        // .filter((cartItem)=> cartItem.amount !== 0)

        return {...state, cart: tempCart}
     }


    //  same function dfferent implementation sharik work avanila Y?
    // if (action.type==='INCREASE'){
        
    //     return {...state, amount : state.cart.map((cartItem)=>{
    //         if(cartItem.id===action.payload){
    //             return {...cartItem, amount:cartItem.amount +1 }
    //         }
    //         return state
    //     }) }
    //     return state
    //  }
   
    //-------------------------------
    if(action.type==='GET_TOTALS'){
        let {total, amount } = state.cart.reduce((cartTotal,cartItem)=>{
          const {amount,price}= cartItem
          let tempTotal = amount * price
          
          cartTotal.amount += amount
          cartTotal.total += tempTotal 

          return cartTotal 
        },
        { 
          total : 0,
          amount:0
        }
        )
        total = parseFloat(total.toFixed(2))
        return {...state, total , amount}
    }

    //--------------alternative of same
    // if (action.type === "GET_TOTALS") {
    //     let tempTotal = 0;
    //     let tempAmount = 0;
    //     state.cart.map((item) => {
    //       const { price, amount } = item;
    //       tempTotal += price * amount;
    //       tempAmount += amount;
    //     });
    //     return {
    //       ...state,
    //       total: parseFloat(tempTotal.toFixed(2)),
    //       amount: tempAmount,
    //     };
    //   }
    
    return state
}

export default reducer