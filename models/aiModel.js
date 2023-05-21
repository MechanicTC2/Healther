const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
});
const openai = new OpenAIApi(configuration);

	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "format both DRI and micronutrients into a javascript object: " + gender + ", " + age + " year old, " + height + ", " + weight + " pounds.",
		max_tokens: 3000,
		temperature: 0,
	});
	return response.data.choices[0].text
}

async function getDiet(gender, age, height, weight){
	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "create a food diet based on this information: " + gender + ", " + age + " year old, " + height + ", " + weight + " pounds." + " format this into a javascript object",
		max_tokens: 3000,
		temperature: 0,
	});
	return response.data.choices[0].text
}

