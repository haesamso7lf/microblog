const mongoose = require('mongoose');
var url = process.env.DATABASEURL || "mongodb://localhost:27017/microblog";
mongoose.connect(url);

module.exports = {mongoose};
