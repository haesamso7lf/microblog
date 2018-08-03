const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/microblog');

module.exports = {mongoose};
