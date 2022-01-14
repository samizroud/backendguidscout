const mongoose = require("mongoose")
const joi = require('joi')

const schemaMesNotif = mongoose.Schema({
    titre: String,
    description: String,
    createur:joi.object(),
    source: {
        id:{type:String},
        type:{type:String,required:true},
    },
    created_at: Date,
    etat: Boolean,
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Notification = mongoose.model('Notification', schemaMesNotif)




module.exports.Notification = Notification