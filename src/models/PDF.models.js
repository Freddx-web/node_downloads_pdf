const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    fingerid: Number,
    passcode: Number,
    stripeid: String,
    name: String,
    email: String,
    phone: String,
    fingerprint: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('member', MemberSchema);