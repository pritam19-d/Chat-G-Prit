import { ChatSidebar } from "components/ChatSidebar";
import { streamReader } from "openai-edge-stream";
import Head from "next/head";
import { useState } from "react";

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("/api/chat/sendMessage", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ message: inputMessage })
    })// this is stopping here while awaiting fetch

    const data = response.data
    if (!!data) {
      const reader = data.getReader();
      await streamReader(reader, (message) => {
        console.log("Message :", message);
      })
      // setInputMessage("")
    } else {
      console.log("No data found");
      return
    }
  }

  return (
    <div>
      <Head>
        <title>Chat-G-Prit | New Chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className="bg-gray-700 flex flex-col">
          <div className="flex-1">Chat Window</div>
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Ask your query..."
                  className="w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500"
                />
                <button type="submit" className="btn">Send</button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}
