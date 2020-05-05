const db = require("../models");

exports.getNote = async function(req, res, next){
    try {
        let note = await db.Note.findById(req.params.noteId);
        console.log(note);
        return res.status(200).json(note);
    } catch(err) {
        return next(err);
    }
}

exports.getAllNotes = async function(req, res, next){
    try {
        let foundUser = await db.User.findById(req.params.id);
        return res.status(200).json(foundUser.notes);
    } catch(err) {
        return next(err);
    }
}

exports.createNote = async function(req, res, next){
    try {
        let note = await db.Note.create({
            title: req.body.title,
            content: req.body.content,
            user: req.params.id
        });

        let foundUser = await db.User.findById(req.params.id);
        foundUser.notes.push(note._id);
        await foundUser.save();

        let foundNote = await db.Note.findById(note._id).populate("user", {
            username: true
        })

        return res.status(200).json(foundNote);
    } catch(err) {
        return next(err);
    }
}

exports.deleteNote = async function(req, res, next){
    try {
        let foundNote = await db.Note.findById(req.params.noteId);
        await foundNote.remove();
        return res.status(200).json(foundNote);
    } catch(err) {
        return next(err);
    }
}

exports.updateNote = function(req, res, next){
    try {
        db.Note.findByIdAndUpdate(req.params.noteId, req.body, {new: true}, function(err, foundNote){
            if(err){
                return next(err);
            } else {
                return res.status(200).json(foundNote);
            }
        })
    } catch(err) {
        return next(err);
    }
}