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
                testId: {type: Schema.Types.ObjectId, ref: 'Test', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }


});




doctorSchema.methods.addToCart = function(test) {
    const cartTestIndex = this.cart.items.findIndex(cp => {                          // First find, if it exists, the position of the test in the cart items array
        return cp.testId.toString() === test._id.toString();                      // return the position of the test in the cart items array (by mapping out the enitre array and checking where id equals the id given)
    });
    let newQuantity = 1;                                                                // Set quantity to 1
    const updatedCartItems = [...this.cart.items];                                      // create a copy of the cart items array

    if (cartTestIndex >= 0) {                                                        // So, if you found the test in the cart.items array
        newQuantity = this.cart.items[cartTestIndex].quantity + 1;                   // get its quantity and add 1
        updatedCartItems[cartTestIndex].quantity = newQuantity                       // then set this to the tests new quantity
    } else {                                                                            // else, if the test didnt exist
        updatedCartItems.push({                                                         // Push the new test and its quantity (of 1) onto our create copy of the array
            testId: test._id, 
            quantity: newQuantity
        });        
    }
    const updatedCart = {                                                               // Now, create a new Cart constant, where the cart.items array = updated version from either the if or else
        items: updatedCartItems
    };
    this.cart = updatedCart;                                                            // Set the updatedCart to Cart
    return this.save();                                                                 // Call the mongoose method save()
}

doctorSchema.methods.removeFromCart = function(testId) {                               // Get the prodId as an argument
    const updatedCartItems = this.cart.items.filter(item => {                           // create an UpdatedCartItems array where were map everything again, only filter out the product with the ID given
        return item.testId.toString() !== testId.toString();
    });
    this.cart.items = updatedCartItems;                                                 // Save that new cartItems array to cart.items
    return this.save();                                                                 // call mongoose method save(), to save to the collection
}

doctorSchema.methods.clearCart = function(){
    this.cart = { items: [] };
    return this.save();
}  





module.exports = mongoose.model('Doctor', doctorSchema);









// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const doctorSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//         },
//     phone: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     code: {
//         type: String,
//         required: true
//     },
//     tel: {
//         type: String,
//         required: true
//     },
//     cart: {
        
//         items: [
//             {
                
//                 _id: false,
//                 testName: {type: String}
                
//             }
//         ]
        

//     }


// });




