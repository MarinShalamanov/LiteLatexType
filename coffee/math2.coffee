window.square = (x) -> 
	x = 5
	x*x


class Term
	toString: ->
	
class Atom extends Term
	constructor: (@val) ->
	
	toString: => "#{@val}"
	
	
class UnaryOperator extends Term
	constructor: (@operator, @val) ->
	
	toString: =>
		return "\\#{@operator}{#{@val.toString}}"

class BinaryOperator extends Term
	constructor: (@operator, @val1, @val2) ->
	
	toString: => 
		return "#{@val1.toString()}#{@operator}#{@val2.toString()}" if @operator in ['^', '_', '+', '-', '*']
		return "\\#{@operator.toString()}{#{@val1}}{#{@val2.toString()}}"

class Block extends Term
	constructor: (@values) ->
	
	toString:  => 
		return @values[0].toString() if @values.length == 1
		return "(" + @values.join(" ") + ")"
		
	toStringWithoutBrackets: => 
		return @values.join(" ")
	
isLetter = (l) -> (/[a-z0-9]/i).test(l);

isNumber = (l) -> (/[0-9]/i).test(l);

tokenize = (str) ->
	tokens = [];
	i = 0;
	while i < str.length
		if str.charAt(i) == ' '     
			;
		else if isNumber str.charAt(i)
			j = i+1
			j++ while isNumber (str.charAt(j))
			tokens.push(str.substring(i, j))
			i = j-1
		
		else if str.charAt(i) == '\\'
			j = i+1
			j++ while isLetter (str.charAt(j))
			tokens.push(str.substring(i, j))
			i = j-1
			
		else tokens.push(str.charAt(i))
		
		i++
		
	tokens

extractBrackets = (tokens) -> 
	while true
		newTokens = [];
		
		i = 0;
		found = false;
		while i < tokens.length 
			if tokens[i] == '('
				found = true;
				break;
			i++
		
		if !found 
			return tokens
	
		newTokens.push(it) for it in tokens.slice(0, i)
		
		numOpenBrackets = 1;
		j = i+1;
		while j < tokens.length
			if tokens[j] == '('	
				numOpenBrackets++;
			else if tokens[j] == ')'
				numOpenBrackets--;
				if numOpenBrackets == 0
					break;
			j++
		
		
		newTokens.push(new Block(proccess(tokens.slice(i+1, j))))
		
		j++
		if j < tokens.length
			newTokens.push(it) for it in tokens.slice(j)
		
		tokens = newTokens
		

handleFractions = (tokens) ->
	while true 
		foundFraction = false
		
		console.log(tokens)
		
		newTokens = []
		
		i = 0;
		for i in [1, tokens.length-2]  # excluded the corner cases
			if tokens[i] == "/"
				foundFraction = true
				break;
		
		if !foundFraction 
			return tokens
		
		console.log("i", i)
		
		newTokens.push(it) for it in tokens.slice(0, i-1)
		
		nom = tokens[i-1]
		denom = tokens[i+1] 
		
		frac = new BinaryOperator("frac", nom, denom);
		
		newTokens.push(frac)
		
		i = i+2;
		if i < tokens.length
			newTokens.push(it) for it in tokens.slice(i)
			
		tokens = newTokens
		
		
		
		
proccess = (tokens) ->
	tokens = extractBrackets(tokens)
	tokens = handleFractions(tokens)
	tokens
			
	
window.parseToLatex = (str) -> 	
	str = str.replace(/\r\n|\r|\n/g,"\\newline ");
	str = str.replace(/cos/g,"\\cos ");
	str = str.replace(/sin/g,"\\sin ");
	str = str.replace(/sq/g,"\\sqrt ");
	str = str.replace(/\\i/g,"\\int ");
	
	tokens = tokenize(str)
	tokens = proccess (tokens)
	
	exp = new Block(tokens)
	#console.log("dinal exp", exp)
	outstr = exp.toStringWithoutBrackets();
	