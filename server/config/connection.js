const { connect, connection } = require('mongoose');

const connectionSTring = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bgcDB'

connect(connectionSTring, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;