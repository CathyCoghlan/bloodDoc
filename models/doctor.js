const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                testId: {type: String}
                
            }
        ]
    }


});

doctorSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {                          // First find, if it exists, the position of the product in the cart items array
        return cp.productId.toString() === product._id.toString();                      // return the position of the product in the cart items array (by mapping out the enitre array and checking where id equals the id given)
    });
    let newQuantity = 1;                                                                // Set quantity to 1
    const updatedCartItems = [...this.cart.items];                                      // create a copy of the cart items array

    if (cartProductIndex >= 0) {                                                        // So, if you found the product in the cart.items array
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;                   // get its quantity and add 1
        updatedCartItems[cartProductIndex].quantity = newQuantity                       // then set this to the products new quantity
    } else {                                                                            // else, if the product didnt exist
        updatedCartItems.push({                                                         // Push the new product and its quantity (of 1) onto our create copy of the array
            productId: product._id, 
            quantity: newQuantity
        });        
    }
    const updatedCart = {                                                               // Now, create a new Cart constant, where the cart.items array = updated version from either the if or else
        items: updatedCartItems
    };
    this.cart = updatedCart;                                                            // Set the updatedCart to Cart
    return this.save();                                                                 // Call the mongoose method save()
}



// doctorSchema.methods.addToCart = function(test) {

//     const cartTestIndex = this.cart.tests.findIndex(cp => {                          // First find, if it exists, the position of the product in the cart items array
//         return cp.testId.toString() === test._id.toString();                      // return the position of the product in the cart items array (by mapping out the enitre array and checking where id equals the id given)
//     });
//     const updatedCartTests = [...this.cart.tests]; 

//     // if test does not already exists
//     if(!cartTestIndex >=0) {
//         updatedCartTests.push({
//             testId: test._id
//         });
//     }
//     const updatedCart = {
//         tests: updatedCartTests
//     };
//     this.cart = updatedCart;
//     return this.save();
// }


module.exports = mongoose.model('Doctor', doctorSchema);

