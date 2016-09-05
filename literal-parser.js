
module.exports = function(input) {

    // replace \x22 with double quotes
    input = input.toString().replace(/\\x22/g, "\"");
    // replace \x27 with single quotes
    input = input.toString().replace(/\\x27/g, "\'");
    // remove new line characters
    input = input.toString().replace(/\\n/g, "");
    // replace forward slash with correct values
    input = input.toString().replace(/\\\//g, "/");
    // replace backslash with correct values
    input = input.toString().replace(/\\\\/g, "\\");

    return input;

};
