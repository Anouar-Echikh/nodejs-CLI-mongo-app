const mongoose = require("mongoose");
const assert = require("assert");
mongoose.Promise = global.Promise;
const db = mongoose.connect("mongodb://localhost:27017/note_db");

// Converts value to lowercase
function toLower(v) {
  return v.toLowerCase();
}

// Define a Note Schema
const noteSchema = mongoose.Schema({
  _id: { type: Number },
  title: { type: String, set: toLower },
  description: { type: String, set: toLower }
});

// Define model as an interface with the database
const Note = mongoose.model("Note", noteSchema);

/**
 * @function  [addNote]
 * @returns {String} Status
 */
const addNote = note => {
  Note.create(note, err => {
    assert.equal(null, err);
    console.info("New note added");
    mongoose.connection.close();
  });
};

/**
 * @function  [getNote]
 * @returns {Json} note
 */
const getNote = title => {
  // Define search criteria
  const search = new RegExp(title, "i");

  Note.find({ $or: [{ title: search }] }).exec((err, note) => {
    assert.equal(null, err);
    console.info(note);
    console.info(`${note.length} matches`);
    mongoose.connection.close();
  });
};

/**
 * @function  [updateNote]
 * @returns {Sting} status
 */
const updateNote = (_id, note) => {
  Note.update({ _id }, note).exec((err, status) => {
    assert.equal(null, err);
    console.info("Note updated successfully");
    mongoose.connection.close();
  });
};

/**
 * @function  [deleteNote]
 * @returns {String} status
 */
const deleteNote = _id => {
  Note.deleteOne({ _id }).exec((err, status) => {
    assert.equal(null, err);
    console.info("Note deleted successfully");
    mongoose.connection.close();
  });
};

/**
 * @function  [getNoteList]
 * @returns [notelist] notes
 */
const getNoteList = () => {
  Note.find().exec((err, notes) => {
    assert.equal(null, err);
    console.info(notes);
    console.info(`${notes.length} notes`);
    mongoose.connection.close();
  });
};

// Export all methods
module.exports = {
  addNote,
  getNote,
  getNoteList,
  updateNote,
  deleteNote
};
