var Note = require("../models/Notes");
var getDate = require("../scripts/date");

module.exports = {
    get: function(data,callback){
        Note.find({
            _headlineId: data._id,
            date: getDate(),
            noteText: data.noteText
        });
        Note.create(newNote, function(error, doc){
            if(error){
                console.log(error)
            }
            else{
                console.log(doc)
                callback(doc)
            }
        })
        
    },
    delete: function(data, callback){
        Note.remove({
            _id:data._id
        },callback);
    }
}