const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

async function getDriMicro(gender, age, height, weight){
	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "format both DRI and micronutrients into a javascript object: " + gender + ", " + age + " year old, " + height + ", " + weight + " pounds.",
		max_tokens: 3000,
		temperature: 0,
	});
	console.log(response.data.choices[0].text)
	return response.data.choices[0].text
}

async function getDiet(gender, age, height, weight){
	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "create a food diet based on this information: " + gender + ", " + age + " year old, " + height + ", " + weight + " pounds." + " format this into a javascript object",
		max_tokens: 3000,
		temperature: 0,
	});
	console.log(response.data.choices[0].text)
	return response.data.choices[0].text
}

module.exports = {getDriMicro, getDiet}