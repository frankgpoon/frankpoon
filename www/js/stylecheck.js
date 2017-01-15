// IN PROGRESS:
// DONE: lineLength, nameCheck, booleanZenCheck, encapsulation
// TODO: OUTPUT TO HTML, DOCUMENTATION, encapsulation, headers (hard): parameters/returns/pre-post/no implementations, shitty if/else, shitty loops, no spaces between operators
// TOO HARD: extra data structures, anything regarding specfication, Java naming conventions
//

function styleCheck() {
    var file = document.getElementById('file').files[0];
    var fileName = file.name;
    var fileSize = file.size;
    if (fileName.substring(fileName.length - 5) !== '.java') {
        alert('The file uploaded must have the extension .java');
    } else if (fileSize > 16384) {
        alert('The file uploaded is over 16kb');
    } else {
        var name = fileName.substring(0, fileName.length - 5);
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function(progressEvent) {
            var lines = this.result.split('\n');
            var errors = [];

            var classIndex = classNameCheck(lines, errors, name);

            encapsulationCheck(lines, errors, classIndex);

            lineLengthCheck(lines, errors);

            booleanZenCheck(lines, errors);

            var output = printErrors(errors, fileName);

            alert(output); //how to implement into html?
        };
    }
};

function printErrors(errors, fileName) {
    var str = 'File ' + fileName + ': ' + errors.length + ' errors\n';
    for (var i = 0; i < errors.length; i++) {
        str = str + errors[i] + '\n';
    }
    return str;
};

function lineLengthCheck(lines, errors) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length >= 100) {
            errors.push('Line length was over 100 characters at line ' + (i + 1));
        }
    }
};

function classNameCheck(lines, errors, name) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes('public interface') || lines[i].includes('public class')) {
            if (!lines[i].includes(name)) {
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
};

function encapsulationCheck(lines, errors, classIndex) {
    if (classIndex !== -1) {
        var i = 0;
        while (!lines[i].includes('(')) {
            if (lines[i].includes(';')
                && (!lines[i].includes('private')
                    && !lines[i].includes('public static final')
                    && !lines[i].includes('/'))) {
                errors.push('Bad encapsulation at line ' + (i + 1));
            }
            i++;
        }
    }
}

function booleanZenCheck(lines, errors) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes('== true') || lines[i].includes('return true;')
        || lines[i].includes('!= true') || lines[i].includes('== false')
        || lines[i].includes('return false;') || lines[i].includes('!= false')) {
            errors.push('Bad boolean zen at line ' + (i + 1));
        }
    }
};
