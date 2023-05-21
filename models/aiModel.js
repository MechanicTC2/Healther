const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: "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" 
});
const openai = new OpenAIApi(configuration);

async function getNutrition(gender, age, height, weight){
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "format both DRI and micronutrients into a javascript object: " + gender + ", " + age + " year old, " + height + " centimeters, " + weight + " kilograms.",
		max_tokens: 3000,
		temperature: 0,
	});
	//console.log(response.data.choices[0].text)
	return response.data.choices[0].text
}

async function getDiet(gender, age, height, weight){
	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "create a food diet based on this information: " + gender + ", " + age + " year old, " + height + " centimeters, " + weight + " kilograms." + " format this into a javascript object",
		max_tokens: 3000,
		temperature: 0,
	});
	//console.log(response.data.choices[0].text)
	return response.data.choices[0].text
}

function queryTags(images){
    console.log(images);
    fetch('https://www.nyckel.com/v1/functions/b2a5oliheud0po9y/invoke', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: images
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    });
}

module.exports = {getDiet, getNutrition, queryTags}