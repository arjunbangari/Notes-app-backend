const express = require("express");
const router = express.Router( {mergeParams: true} );

const methods = require("../handlers/notes");

router.route("/").post(methods.createNote)
                 .get(methods.getAllNotes);
router.route("/:noteId").get(methods.getNote)
                        .delete(methods.deleteNote)
                        .put(methods.updateNote);

module.exports = router;