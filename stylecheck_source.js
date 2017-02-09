/**
 * StyleCheck
 * A tool that checks for internal correctness or bad style in Java code to a limited extent, where
 * internal correctness is defined by the University of Washington CSE department.
 *
 * Implemented style checks:
 * lineLengthCheck, nameCheck, booleanZenCheck, encapsulationCheck
 *
 * In progress:
 * headers (parameters, returns, pre-post, no implementations) - HARD; shitty if/else;
 * shitty loops; no spaces between operators
 *
 * @author Frank Poon <mail@frankpoon.com>
 * @version 0.1.2
 */

/**
 * The main function that is called on the website. Reads the uploaded file and checks for
 * style errors depending on user input. Also checks that file conditions are correct
 * (must be plaintext file with extension .java and under 16kb)
 * @return {undefined} prints errors as string output in HTML. No actual return.
 */
function styleCheck() {
    var file = document.getElementById('file').files[0];
    var fileName = file.name;
    var fileSize = file.size;

    if (fileName.substring(fileName.length - 5) !== '.java') {
        alert('The file uploaded should have the extension .java');
    } else if (fileSize > 16384) {
        alert('The file uploaded should be under 16kb');
    } else {
        var name = fileName.substring(0, fileName.length - 5);
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function(progressEvent) {
            var lines = reader.result.split('\n');
            var errors = [];
            var classIndex = 0;

            classIndex = nameCheck(lines, errors, name, document.getElementById('name').checked);

            if (document.getElementById('encapsulation').checked) {
                encapsulationCheck(lines, errors, classIndex);
            }
            if (document.getElementById('linelength').checked) {
                lineLengthCheck(lines, errors);
            }
            if (document.getElementById('booleanzen').checked) {
                booleanZenCheck(lines, errors);
            }

            var output = printErrors(errors, fileName, '<br>')

            document.getElementById('log').innerHTML = output;
        }
    }
}

/**
 * Prints style errors
 * @param {array} errors - where the errors are stored
 * @param {string} fileName - the name of the file uploaded
 * @param {string} newLineString - how to add the new lines (\n for JavaScript, <br> for HTML, etc)
 * @return {string} multiple lines describing the style errors
 */
function printErrors(errors, fileName, newLineString) {
    var str = 'File ' + fileName + ': ' + errors.length + ' errors' + newLineString + newLineString;
    for (var i = 0; i < errors.length; i++) {
        str = str + errors[i] + newLineString;
    }
    return str;
}

/**
 * Checks that line length is under 100 characters
 * @param {array} lines - where the text is stored
 * @param {array} errors - where the errors are stored
 * @return {undefined} nothing, all errors are in array errors
 */
function lineLengthCheck(lines, errors) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length >= 100) {
            errors.push('Line length was over 100 characters at line ' + (i + 1));
        }
    }
}

/**
 * Checks that file name and class/interface name match
 * @param {array} lines - where the text is stored
 * @param {array} errors - where the errors are stored
 * @param {string} name - the name of the class
 * @return {int} the location of the line "public class", useful for checking encapsulation
 */
function nameCheck(lines, errors, name, checked) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes('public interface') || lines[i].includes('public class')) {
            if (!lines[i].includes(name) && checked) {
                errors.push('File name was different from class or interface name');
            }
            if (lines[i].includes('interface')) {
                return -1;
            } else {
                return i;
            }
        }
    }
    errors.push('File name was different from class or interface name');
}

/**
 * Checks for encapsulation of variables in the class
 * @param {array} lines - where the text is stored
 * @param {array} errors - where the errors are stored
 * @param  {int} classIndex the location of the line "public class"
 * @return {undefined} nothing, all errors are in array errors
 */
function encapsulationCheck(lines, errors, classIndex) {
    if (classIndex !== -1) {
        var i = classIndex;
        while (!lines[i].includes('(')) {
            if (lines[i].includes(';')
                && (!lines[i].includes('private')
                    && !lines[i].includes('public static final'))
                    && !lines[i].includes('import')) {
                errors.push('Bad encapsulation at line ' + (i + 1));
            }
            i++;
        }
    }
}

/**
 * Checks for bad boolean zen
 * @param {array} lines - where the text is stored
 * @param {array} errors - where the errors are stored
 * @return {undefined} nothing, all errors are in array errors
 */
function booleanZenCheck(lines, errors) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes('== true') || lines[i].includes('!= true')
        || lines[i].includes('== false') || lines[i].includes('!= false')) {
            errors.push('Bad boolean zen at line ' + (i + 1));
        }
    }
}
