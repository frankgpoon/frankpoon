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
 * @version 0.1.3
 */

var version = '0.1.3'

/**
 * The main function that is called on the website. Reads the uploaded file and checks for
 * style errors depending on user input. Also checks that file conditions are correct
 * (must be plaintext file with extension .java and under 16kb)
 * @return {undefined} prints errors as string output in HTML. No actual return.
 */
function styleCheck() {
    console.log('StyleCheck Version ' + version + ' - Debugging Log');

    var file = document.getElementById('file').files[0];
    var fileName = file.name;
    var fileSize = file.size;

    console.log('File successfully uploaded.');
    console.log('File name: ' + fileName);
    console.log('File size: ' + fileSize);

    if (fileName.substring(fileName.length - 5) !== '.java') {
        console.log('File uploaded is not detected to be a Java source file. StyleCheck will not run.');
        alert('The file uploaded should have the extension .java');
    } else if (fileSize > 16384) {
        console.log('File uploaded is over the 16kb limit. StyleCheck will not run.');
        alert('The file uploaded should be under 16kb');
    } else {
        console.log('File uploaded has fulfilled all conditions. Running StyleCheck.');
        var name = fileName.substring(0, fileName.length - 5);
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function(progressEvent) {
            var lines = reader.result.split('\n');
            var errors = [];
            var classIndex = -2;

            classIndex = nameCheck(lines, errors, name, document.getElementById('name').checked);

            if (document.getElementById('encapsulation').checked) {
                encapsulationCheck(lines, errors, classIndex);
            }
            if (document.getElementById('lineLength').checked) {
                lineLengthCheck(lines, errors);
            }
            if (document.getElementById('booleanZen').checked) {
                booleanZenCheck(lines, errors);
            }

            document.getElementById('log').innerHTML = printInfo(errors, fileName, '<br>');
        }
    }
}

/**
 * Prints file info and style errors
 * @param {array} errors - where the errors are stored
 * @param {string} fileName - the name of the file uploaded
 * @param {string} newLineString - how to add the new lines (\n for JavaScript, <br> for HTML, etc)
 * @return {string} multiple lines describing the style errors
 */
function printInfo(errors, fileName, newLineString) {
    console.log('Running printInfo...');
    str = 'File ' + fileName + ': ';
    if  (errors.length === 0) {
        str = str + 'no errors';
    } else if (errors.length === 1) {
        str = str + '1 error';
    } else {
        str = str + errors.length + ' errors';
    }
    str = str + newLineString + newLineString;
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
    console.log('Running lineLengthCheck...');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length >= 100) {
            console.log('Error found');
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
    console.log('Running nameCheck...');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes('public interface') || lines[i].includes('public class')) {
            if (!lines[i].includes(name) && checked) {
                console.log('Error found');
                errors.push('File name was different from class or interface name');
                return -2;
            }
            if (lines[i].includes('interface')) {
                console.log('File is an interface');
                return -1;
            } else {
                console.log('File is a class');
                return i;
            }
        }
    }
    console.log('Error found');
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
    console.log('Running encapsulationCheck...');
    if (classIndex > -1) {
        console.log('File is a valid class.');
        var i = classIndex;
        while (!lines[i].includes('(')) {
            if (lines[i].includes(';')
                && (!lines[i].includes('private')
                && !lines[i].includes('public static final'))
                && !lines[i].includes('import')) {
                console.log('Error found');
                errors.push('Bad encapsulation at line ' + (i + 1));
            }
            i++;
        }
    } else {
        console.log('Skipping encapsulationCheck because file is an interface or not valid.');
    }
}

/**
 * Checks for bad boolean zen
 * @param {array} lines - where the text is stored
 * @param {array} errors - where the errors are stored
 * @return {undefined} nothing, all errors are in array errors
 */
function booleanZenCheck(lines, errors) {
    console.log('Running booleanZenCheck...');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes('== true') || lines[i].includes('!= true')
        || lines[i].includes('== false') || lines[i].includes('!= false')) {
            console.log('Error found');
            errors.push('Bad boolean zen at line ' + (i + 1));
        }
    }
}
