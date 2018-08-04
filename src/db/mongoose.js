const mongoose = require('mongoose');
var url = process.env.DATABASEURL || "mongodb://microblog123:microblog123@ds111192.mlab.com:11192/microblog";
mongoose.connect(url);

module.exports = {mongoose};
