// declare variables
var reader = new FileReader();
var jsonFromFile;
var numberOfStories = 0;


function runGame(index) {

  if (jsonFromFile == undefined) {
    // the user has not uploaded a valid file, we have no data
    console.log("ERROR: A file has not been read");
    return;
  }

  if (index+1 > jsonFromFile.stories.length) {
    // invalid index chosen
    console.log("ERROR: Invalid index chosen");
    return;
  }

  var storyChosen = jsonFromFile.stories[index];
  var content = jsonFromFile.stories[index].content.join(" ");
  var title = jsonFromFile.stories[index].title;
  var parameters = jsonFromFile.stories[index].parameters;

  // for each parameter in the story, we need the user to 
  // give us an input value, and then we replace te placeholder with their input
  for(var i=0; i<parameters.length; i++) {
    var param = parameters[i];
    var placeholder = param.placeholder;

    // ask the user to enter a value
    var promptString = "Please Enter: " + param.inputPrompt;
    var progressString = "(" + (i+1) + "/" + parameters.length + ")";
    var input = prompt(promptString + " " + progressString);


    // take the user's input and replace the placeholder example: [0] with their input
    while (content.indexOf(placeholder) != -1) {
      content = content.replace(placeholder, "<strong>"+input+"</strong>");
      title = title.replace(placeholder, "<strong>"+input+"</strong>");
    }
  }

  content = "<div>" + content + "</div>"
  // finally, put the content in the html to display
  document.getElementById("story-text").innerHTML = content;
  document.getElementById("story-title").innerHTML = title;
}

$(document).ready(function() {

  // When a file is uploaded, this function is called
  function handleFileSelect(evt) {
    var files = evt.target.files;
    var output = [];
    reader.readAsText(files[0], "UTF-8");
  }

  document.getElementById('file').addEventListener('change', handleFileSelect, false);
});

reader.onload = function (e) {
  jsonFromFile = JSON.parse(e.target.result);

  // save the number of stores in the input file
  numberOfStories = jsonFromFile.stories.length;

  for(var i=0; i<numberOfStories; i++) {
    // setup button
    document.getElementById("story_"+(i+1)).className = "active";
    document.getElementById("story_"+(i+1)+"_text").innerHTML = jsonFromFile.stories[i].genericTitle;
  }
}
