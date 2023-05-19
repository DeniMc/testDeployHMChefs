const API_KEY = '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';



function displayResult() {
   
    const chefName = document.getElementById("chef-name").value;
const comeFrom = document.getElementById("comeFrom").value;
const whyCook = document.getElementById("whyCook").value;
const signatureDish = document.getElementById("signatureDish").value;
    
    const result = `Please write me an interesting and attractive Chefs Profile. My Name is ${chefName}. I come from ${comeFrom}. I love to cook because ${whyCook}. My signature recipes are ${signatureDish}`;
    
    document.getElementById("promptResult").value = result;

}

const GPTButton = document.querySelector("#GPTButton")
const inputElement = document.querySelector('#promptResult')
const inputSubmit = document.querySelector('#submit')
const historyElement = document.querySelector('.history')
const outputElement = document.querySelector('#chefDescription')
const refreshButton = document.querySelector('#newProfile')


function changeInput(value) {
   const inputElement = document.querySelector('#promptResult')
   inputElement.value = value
}

async function getMessage () {
    console.log('clicked');  
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: inputElement.value}],
            max_tokens: 400 
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
            console.log(data)
            outputElement.textContent = data.choices[0].message.content

        if (data.choices[0].message.content) { 
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
        
    } catch (error) {
        console.error(error)
    }
}

function clearInputs() {
    document.getElementById("chef-name").value = "";
    document.getElementById("comeFrom").value = "";
    document.getElementById("whyCook").value = "";
    document.getElementById("signatureDish").value = "";
    document.getElementById("promptResult").value = "";
    outputElement.textContent = '';
}

inputSubmit.addEventListener('click', getMessage)

refreshButton.addEventListener('click', clearInputs)