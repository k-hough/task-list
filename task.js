// Keith Hough, keithsportfolio.com, 2017

"use strict";

var $ = function(id) { return document.getElementById(id); };

var tasks = [];

// on page load
var checkStorage = function() {
    var tasksStr = localStorage.getItem("tasks") || "";

    // if there are tasks in local storage
    if (tasksStr.length > 0) {
        tasks = tasksStr.split("|");  // tasks is a global
        for (var i = 0; i < tasks.length; i++) {
            displayTask(tasks[i]);
        }
    }
}

// on add click
var addTask = function() {

    // get user input
    var task = $("task").value;

    if (task == "") {
        $("task").value = "Enter a Task";
        $("task").select();
    } else {
        tasks.push(task);
        displayTask(task);
        $("task").value = "";
        $("task").focus();
      }
}

// after add click
var displayTask = function(task) {

    // add a div to the DOM for the new task, containing a textbox
    // and delete "button"
    var div = document.createElement("div");
    div.className = "delete";
    var inputText = document.createElement("input");
    inputText.type = "text";
    inputText.value = task;
    var span = document.createElement("span");
    span.onclick = deleteTask;
    var deleteX = document.createTextNode("\u00D7");
    span.appendChild(deleteX);
    div.appendChild(inputText);
    div.appendChild(span);
    $("tasks").appendChild(div);
}

// on save click
var saveTasks = function() {

    // convert global array to string for local storage
    localStorage.tasks = tasks.join("|");
}

// delete task
var deleteTask = function() {
    console.log(tasks);

    // this.parentNode is the div for the task
    $("tasks").removeChild(this.parentNode);

    // remove the task from the global array
    var taskIndex = tasks.indexOf(this.previousSibling.value);
    tasks.splice(taskIndex, 1);

    $("task").focus();
    console.log(tasks);
}

window.onload = function() {
  checkStorage();
  $("add").onclick = addTask;
  $("save").onclick = saveTasks;
  $("task").focus();
}
