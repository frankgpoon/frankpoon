function styleCheck(){console.log("StyleCheck Version "+version+" - Debugging Log")
var e=document.getElementById("file").files[0],n=e.name,l=e.size
if(console.log("File successfully uploaded."),console.log("File name: "+n),console.log("File size: "+l),".java"!==n.substring(n.length-5))console.log("File uploaded is not detected to be a Java source file. StyleCheck will not run."),alert("The file uploaded should have the extension .java")
else if(l>16384)console.log("File uploaded is over the 16kb limit. StyleCheck will not run."),alert("The file uploaded should be under 16kb")
else{console.log("File uploaded has fulfilled all conditions. Running StyleCheck.")
var o=n.substring(0,n.length-5),i=new FileReader
i.readAsText(e),i.onload=function(e){var l=i.result.split("\n"),s=[],t=-2
t=nameCheck(l,s,o,document.getElementById("name").checked),console.log(),document.getElementById("encapsulation").checked&&encapsulationCheck(l,s,t),document.getElementById("linelength").checked&&lineLengthCheck(l,s),document.getElementById("booleanzen").checked&&booleanZenCheck(l,s),document.getElementById("log").innerHTML=printInfo(s,n,"<br>")}}}function printInfo(e,n,l){console.log("Running printInfo..."),str="File "+n+": ",0===e.length?str+="no errors":1===e.length?str+="1 error":str=str+e.length+" errors",str=str+l+l
for(var o=0;o<e.length;o++)str=str+e[o]+l
return str}function lineLengthCheck(e,n){console.log("Running lineLengthCheck...")
for(var l=0;l<e.length;l++)e[l].length>=100&&(console.log("Error found"),n.push("Line length was over 100 characters at line "+(l+1)))}function nameCheck(e,n,l,o){console.log("Running nameCheck...")
for(var i=0;i<e.length;i++)if(e[i].includes("public interface")||e[i].includes("public class"))return!e[i].includes(l)&&o?(console.log("Error found"),n.push("File name was different from class or interface name"),-2):e[i].includes("interface")?(console.log("File is an interface"),-1):(console.log("File is a class"),i)
console.log("Error found"),n.push("File name was different from class or interface name")}function encapsulationCheck(e,n,l){if(console.log("Running encapsulationCheck..."),l>-1){console.log("File is a valid class.")
for(var o=l;!e[o].includes("(");)!e[o].includes(";")||e[o].includes("private")||e[o].includes("public static final")||e[o].includes("import")||(console.log("Error found"),n.push("Bad encapsulation at line "+(o+1))),o++}else console.log("Skipping encapsulationCheck because file is an interface or not valid.")}function booleanZenCheck(e,n){console.log("Running booleanZenCheck...")
for(var l=0;l<e.length;l++)(e[l].includes("== true")||e[l].includes("!= true")||e[l].includes("== false")||e[l].includes("!= false"))&&(console.log("Error found"),n.push("Bad boolean zen at line "+(l+1)))}var version="0.1.3"
