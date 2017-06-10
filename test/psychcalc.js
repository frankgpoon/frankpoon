var version = '0.0.1'

function psychCalc() {

    var scores = {
        exam3: document.getElementById('exam3').value,
        grade: document.getElementById('grade').value,
        exam1: document.getElementById('exam1').value,
        exam2: document.getElementById('exam2').value,
        moa: document.getElementById('moa').value,
        polling: document.getElementById('polling').value,
        extraCredit: document.getElementById('extraCredit').value
    };
    if (scores.extraCredit === '') {
        scores.extraCredit = 0;
    }

    var propertyEmpty = '';
    for (var prop in scores) {
        if (scores[prop] === '') {
            if (propertyEmpty !== '' || (prop !== 'exam3' && prop !== 'grade')) {
                alert('There is not enough information to calculate anything.');
                return;
            }
            propertyEmpty = prop;
        } else {
            scores[prop] = parseFloat(scores[prop]);
        }
    }
    if (propertyEmpty === '') {
        alert('There is nothing to calculate.');
    } else {
        if (propertyEmpty === 'exam3') {
            document.getElementById('result').innerHTML = 'You must get a score of ' +
            calculateExamScore(scores) + ' to get a grade of ' + scores.grade + '.';
        } else if (propertyEmpty === 'grade'){
            document.getElementById('result').innerHTML = 'Your grade is ' +
            calculateGrade(scores) + '.';

        }
    }
}

function calculateExamScore(scores) {
    var minScore = Math.min(scores.exam1, scores.exam2);
    var maxScore = Math.max(scores.exam1, scores.exam2);

    var points = scores.moa + scores.polling + maxScore + Math.round(minScore * 1.5);
    var pointsNeeded = gradeToPoints(grade - extraCredit);
    var examScore = minScore;

    if (points < pointsNeeded) {
        examScore = minScore + (pointsNeeded - points);
    } else if (points > pointsNeeded) {
        examScore = (pointsNeeded - points + Math.round(minScore / 2)) * 2 - 1;
    }

    return examScore;
}

/**
 * Converts grade from a GPA value (X.X) to a point value in Psych 101 format.
 * @param  {double} grade - value from 0.0 to 4.0
 * @return {int}       value from 0 to 120
 */
function gradeToPoints(grade) {
    var points = 0;
    if (grade < 0.7) {
        return points;
    } else if (grade === 4.0) {
        return 119;
    } else if (grade <= 1.0) {
        points = 83 + Math.round((grade - 0.7) * 10);
    } else {
        var basePoints = 88;
        for (var i = 1; i < Math.trunc(grade); i++) {
            basePoints = basePoints + 11;
        }
        points = basePoints + Math.round((grade - Math.trunc(grade) - 0.1) * 10);
    }
    return points;
}

/**
 * Converts points in Psych 101 format to a GPA value (X.X)
 * @param  {object} scores      has all info needed, nothing besides grade can be empty
 * @return {double}             value from 0.0 to 4.0
 */
function calculateGrade(scores) {
    console.log(scores);
    console.log(scores.exam1);
    var minScore = Math.min(scores.exam1, Math.min(scores.exam2, scores.exam3));
    var points = scores.moa + scores.polling + (scores.exam1 + scores.exam2 + scores.exam3 - minScore) + Math.round(minScore / 2);
    console.log(points);
    var grade = 0.0;
    if (points < 82) {
        return grade;
    } else if (points >= 119) {
        grade = 4.0;
    } else if (points < 87) {
        grade = 0.7 + (points - 83) / 10;
    } else {
        var baseGrade = Math.trunc((points - 87) / 11);
        console.log(baseGrade);
        console.log(Math.trunc((points - 87) / 10.0));
        grade = (baseGrade + 1) + (points - 87 - 11 * baseGrade) / 10.0;
    }
    console.log(grade);
    grade = Math.round((grade + scores.extraCredit) * 10) / 10;
    if (grade >= 4.0) {
        return 4.0;
    } else {
        return grade;
    }
}
