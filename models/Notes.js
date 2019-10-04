var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteScheme = new Schema({
        __headlineId: {
            type: Schema.Types.ObjectId,
            ref: "Headline"
        },
        date: String,
        noteContent: String

    }),


    var Note = mongoose.model("Note", noteSchema);

module.exports = Note;