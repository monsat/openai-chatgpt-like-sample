import { Configuration, OpenAIApi } from 'openai'
import type { ChatMessageResponse } from '@/composables/useChat'

export default defineEventHandler(async (event) => {
  const { openaiApiKey: apiKey } = useRuntimeConfig()
  const {
    messages = [],
    temperature = 0.6,
    max_tokens = 2048,
  } = await readBody(event)

  const configuration = new Configuration({ apiKey })
  const openai = new OpenAIApi(configuration)

  // OpenAI config
  const model = 'gpt-3.5-turbo'

  const completion = await openai.createChatCompletion({
    model,
    messages,
    temperature,
    max_tokens,
  })

  // console.log(completion.data.choices)

  const results = (completion.data.choices || []) as ChatMessageResponse[]
  const prompt_tokens = completion.data.usage?.prompt_tokens || null
  const total_tokens = completion.data.usage?.total_tokens || null

  return {
    results,
    prompt_tokens,
    total_tokens,
  }
})
