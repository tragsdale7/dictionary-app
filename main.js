let input = document.getElementById('input');
let button = document.getElementById('button');
let definition = document.querySelector('.definitions-container')

button.addEventListener('click', lookUpWord);
input.addEventListener('keydown', function(e){
	if(e.key === 'Enter') {
		e.preventDefault();
	}
})

function lookUpWord(e) {
	let inputValue = input.value;
	sendAPIRequest(inputValue);
};

function sendAPIRequest(word) {
	let xhttp = new XMLHttpRequest;
	
	xhttp.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			// if(JSON.parse(xhttp.responseText)[0].shortdef[0] === undefined) {
			// 	console.log('word doesnt exist!')
			// 	return;
			// }
			try {
				JSON.parse(xhttp.responseText)[0].shortdef[0];
			}

			catch(err) {
				displayDefinition('Error! This word does not exist.');
				return;
			}
			let definition = JSON.parse(xhttp.responseText)[0].shortdef[0];
			displayDefinition(definition);
		}
	}

	xhttp.open('GET', `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=2e2ba92a-a11e-4c9b-b7e8-0295f2cdf842`, true);
	xhttp.send();

	function displayDefinition(def) {
		definition.innerHTML = `Definition: ${def}`;
	}
}

