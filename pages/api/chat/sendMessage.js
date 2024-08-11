import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge"
}

export default async function handler (req) {
  try {
    const { message } = await req.json()    
    const stream = await OpenAIEdgeStream("https://api.openai.com/v1/chat/completions",{ 
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ content: message, role: "user" }],
        stream: true
      })
    })
    const response = new Response(stream)
    // console.log(`Response received: ${response}`);
    
    return response
  } catch (err) {
    return console.log("Error: ", err);
  }
}