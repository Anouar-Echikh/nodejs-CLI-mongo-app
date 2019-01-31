#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");

const {
  addNote,
  getNote,
  getNoteList,
  updateNote,
  deleteNote
} = require("./logic");

const questions = [
  {
    type: "input",
    name: "_id",
    message: "Enter réf .."
  },
  {
    type: "input",
    name: "title",
    message: "Enter title .."
  },
  {
    type: "input",
    name: "description",
    message: "Enter description .."
  }
];

program.version("0.0.1").description("Note management system");

program
  .command("addNote")
  .alias("a")
  .description("Add a note")
  .action(() => {
    prompt(questions).then(answers => addNote(answers));
  });

program
  .command("getNote <title>")
  .alias("r")
  .description("Get note")
  .action(title => getNote(title));

program
  .command("updateNote <_id>")
  .alias("u")
  .description("Update note")
  .action(_id => {
    prompt(questions).then(answers => updateNote(_id, answers));
  });

program
  .command("deleteNote <_id>")
  .alias("d")
  .description("Delete note")
  .action(_id => deleteNote(_id));

program
  .command("getNoteList")
  .alias("l")
  .description("List notes")
  .action(() => getNoteList());

// Assert that a VALID command is provided
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);
