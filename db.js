const { mongoose } = require('mongoose');

// connection string here
try {
    mongoose.connect('');
} catch (error) {
    console.log(error);
}

// Create Schemas, I'm making user schemas with just username, password, firstName, lastName

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

// Model these created schemas

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
