function styleCheck(){var e=document.getElementById("file").files[0],n=e.name,l=e.size
if(".java"!==n.substring(n.length-5))alert("The file uploaded should have the extension .java")
else if(l>16384)alert("The file uploaded should be under 16kb")
else{var t=n.substring(0,n.length-5),i=new FileReader
i.readAsText(e),i.onload=function(e){var l=i.result.split("\n"),a=[],c=0
document.getElementById("name").checked&&(c=nameCheck(l,a,t)),document.getElementById("encapsulation").checked&&encapsulationCheck(l,a,c),document.getElementById("linelength").checked&&lineLengthCheck(l,a),document.getElementById("booleanzen").checked&&booleanZenCheck(l,a)
var r=printErrors(a,n,"<br>")
document.getElementById("log").innerHTML=r}}}function printErrors(e,n,l){for(var t="File "+n+": "+e.length+" errors"+l+l,i=0;i<e.length;i++)t=t+e[i]+l
return t}function lineLengthCheck(e,n){for(var l=0;l<e.length;l++)e[l].length>=100&&n.push("Line length was over 100 characters at line "+(l+1))}function nameCheck(e,n,l){for(var t=0;t<e.length;t++)if(e[t].includes("public interface")||e[t].includes("public class"))return e[t].includes(l)||n.push("File name was different from class or interface name"),e[t].includes("interface")?-1:t
n.push("File name was different from class or interface name")}function encapsulationCheck(e,n,l){if(-1!==l)for(var t=l;!e[t].includes("(");)!e[t].includes(";")||e[t].includes("private")||e[t].includes("public static final")||e[t].includes("import")||n.push("Bad encapsulation at line "+(t+1)),t++}function booleanZenCheck(e,n){for(var l=0;l<e.length;l++)(e[l].includes("== true")||e[l].includes("!= true")||e[l].includes("== false")||e[l].includes("!= false"))&&n.push("Bad boolean zen at line "+(l+1))}
