import { Configuration, OpenAIApi } from 'openai'

export default defineEventHandler(async (event) => {
  const { openaiApiKey: apiKey } = useRuntimeConfig()
  const {
    prompt = '',
    temperature = 0.6,
    max_tokens = 2048,
  } = await readBody(event)

  if (!prompt) {
    const error = 'No prompt provided'
    return event.node.res.end({ error, result: '' })
  }

  const configuration = new Configuration({ apiKey })
  const openai = new OpenAIApi(configuration)

  // OpenAI config
  const model = 'text-davinci-003'

  const completion = await openai.createCompletion({
    model,
    prompt,
    temperature,
    max_tokens,
  })

  const result = completion.data.choices[0].text?.trim() || ''
  const prompt_tokens = completion.data.usage?.prompt_tokens || null
  const total_tokens = completion.data.usage?.total_tokens || null

  return {
    result,
    prompt_tokens,
    total_tokens,
  }
})
