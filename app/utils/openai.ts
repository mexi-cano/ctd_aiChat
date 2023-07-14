const url = "https://api.openai.com/v1/chat/completions";
const apiKey = `Bearer ${process.env.OPENAI_API_KEY}`;
console.log('apiKey:', apiKey)

export async function fetchBotReply(message: string) {
  console.log('message:', message)

  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey
    },
    body: JSON.stringify({
      'model': 'gpt-3.5-turbo', 
      'messages': [{role: 'user', content: message}]
    })
  });

  const data = await response.json();

  return data;
  
};