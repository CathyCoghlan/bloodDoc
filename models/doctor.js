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
                _id: false,
                testName: {type: String}
                
            }
        ]
    }


});





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

