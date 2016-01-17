
function isLetter(l) {
	return (/[a-z0-9]/i).test(l);
}

function parseFracLeft(str, idx) {
	var leftStart=-1, leftEnd=-1;
	var numBrackets = 0;
	var word_started = false;
	for(var i = idx-1; i >= 0; i--) {
		if(numBrackets == 0 && isLetter(str.charAt(i)) && !word_started) {
			word_started = true;
			leftEnd = i;
			console.log("here")
		}
		
		if(word_started && !isLetter(str.charAt(i))) {
			leftStart = i+1;
			console.log("stop")
			break;
		}
		
		if(str.charAt(i) == ' ') continue;
		
		if(str.charAt(i) == ')') {
			if(numBrackets == 0) {
				leftEnd = i-1;
			}
			numBrackets++;
		}
		
		if(str.charAt(i) == '(') {
			numBrackets--;
			if(numBrackets == 0) {
				leftStart = i+1;
				break;
			}
		}
		
		
		
	}
	
	if(leftStart==-1) leftStart=0;
	if(leftEnd==-1)	leftEnd=0;
	
	return {start: leftStart, end: leftEnd, isWord: word_started};
}

function parseFracRight(str, idx) {
	var leftStart=-1, leftEnd=-1;
	var numBrackets = 0;
	var word_started = false;
	for(var i = idx+1; i < str.length; i++) {
		if(numBrackets == 0 && isLetter(str.charAt(i)) && !word_started) {
			word_started = true;
			leftStart = i;
			console.log("here")
		}
		
		if(word_started && !isLetter(str.charAt(i))) {
			leftEnd = i-1;
			console.log("stop")
			break;
		}
		
		if(str.charAt(i) == ' ') continue;
		
		if(str.charAt(i) == '(') {
			if(numBrackets == 0) {
				leftStart = i+1;
			}
			numBrackets++;
		}
		
		if(str.charAt(i) == ')') {
			numBrackets--;
			if(numBrackets == 0) {
				leftEnd = i-1;
				break;
			}
		}
		
		
		
	}
	
	if(leftStart==-1) leftStart=str.length - 1;
	if(leftEnd==-1)	leftEnd=str.length - 1;
	console.log(str)
	console.log(leftStart, leftEnd, idx)	
	
	return {start: leftStart, end: leftEnd, isWord: word_started};
}

function searchForFact(str) {
	var _new;
	var idx;
	while(true){
		idx = str.indexOf('/');
		if(idx == -1) break;
		
		var parseLeft = parseFracLeft(str, idx);
		var leftStart = parseLeft.start, leftEnd = parseLeft.end;
		var leftWord = parseLeft.isWord;
		
		
		var right = parseFracRight(str, idx);
		
		var _str;
		if(leftWord) {
			_str = str.substring(0, leftStart) + "\\frac{" + str.substring(leftStart, leftEnd+1) + "}";
		} else {
			_str = str.substring(0, leftStart-1) + "\\frac{" + str.substring(leftStart, leftEnd+1) + "}";
		}
		
		if(right.isWord) {
			_str += "{" + str.substring(right.start, right.end+1) + "}" + str.substring(right.end+1);
		} else {
			_str += "{" + str.substring(right.start, right.end+1) + "}" + str.substring(right.end+2);
		}
		
		str = _str;
		console.log(str)
		
		
	} 
	
	return str;
}

function proccess(newContent) {
	newContent = newContent.replace(/\r\n|\r|\n/g,"\\\\");
	newContent = newContent.replace(/cos/g,"\\cos");
	newContent = newContent.replace(/sin/g,"\\sin");
	newContent = newContent.replace(/sq/g,"\\sqrt");
	
	newContent = searchForFact(newContent);
	return newContent;
}

function update () {
	var textView = document.getElementById("text");
	
	if (!!textView) {
		var newContent = textView.value;

		
		newContent = proccess(newContent);
		
		var inner = "<img src=\"http://latex.codecogs.com/gif.latex?" + newContent + "\" border=\"0\"/>";
		
		document.getElementById("latex-view").innerHTML = inner;
	}
	
	setTimeout(update, 1000);
}

update();