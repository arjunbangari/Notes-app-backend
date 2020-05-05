const mongoose = require("mongoose");
const User = require("./user");

const noteSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

noteSchema.pre("remove", async function(next){
    try {
        console.log(this.user);
        let user = await User.findById(this.user);
        user.notes.remove(this.id);
        await user.save();
    } catch(err) {
        return next(err);
    }
})

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;