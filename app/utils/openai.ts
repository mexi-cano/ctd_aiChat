const url = "https://api.openai.com/v1/chat/completions";
const apiKey = `Bearer ${process.env.OPENAI_API_KEY}`;

export async function fetchBotReply(message: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey
    },
    body: JSON.stringify({
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          role: 'user', 
          content: message
        },
        {
          role: 'system',
          content: "You are a Javascript and React mentor. Your students are new to coding. Your role is to guide these students as they learn through steps. Students will submit a function. You will analyze the function and it's goal (task). You will create steps to guide them through learning the concept. You will not give them the answer directly. Your response should be in json format which includes the hint if the function is incorrect or could be improved and a result indicating whether the function is correct or not. {'result': true | false, 'hint': ''}"
        }
      ]
    })
  });

  const data = await response.json();

  return data;
};