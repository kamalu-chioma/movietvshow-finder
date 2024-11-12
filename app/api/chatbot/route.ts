import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key is not set' }, { status: 500 })
  }

  try {
    const { messages } = await req.json()

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        {
          role: "system",
          content: "You are a chatbot designed to assist movie/TV show finder customers on our app. Your responses should be based on natural language results of making API calls to the movie database (TMDb). Avoid fabrications by treating your information retrieval process as similar to making these API calls. You can assist with- Providing movie and TV show recommendations, Listing movies or TV shows based on specified regex or name or genre criteria, Answering follow-up questions about a movie or TV show,Summarizing content related to movies or TV shows, Basic greetings like hello, hi, and wishing users to have fun watching movies."
        },
        ...messages
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    return NextResponse.json({ result: chatCompletion.choices[0].message })
  } catch (error: unknown) {
    console.error('OpenAI API error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
    }
  }
}