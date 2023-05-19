const API_KEY = 'key here';



function displayResult() {
   
    const mealName = document.getElementById("meal-name").value;
const ingredients = document.getElementById("ingredients").value;
const backgroundStory = document.getElementById("background-story").value;
    
    const result = `Please give me an enticing description of ${mealName}, the ingredients used are ${ingredients}. ${backgroundStory}`;
    
    document.getElementById("promptResult").value = result;

}

const GPTButton = document.querySelector("#GPTButton")
const inputElement = document.querySelector('#promptResult')
const inputSubmit = document.querySelector('#submit')
const historyElement = document.querySelector('.history')
const outputElement = document.querySelector('#mealDescription')
const refreshButton = document.querySelector('#newMeal')


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
    document.getElementById("meal-name").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("background-story").value = "";
    document.getElementById("promptResult").value = "";
    outputElement.textContent = '';
}

inputSubmit.addEventListener('click', getMessage)

refreshButton.addEventListener('click', clearInputs)