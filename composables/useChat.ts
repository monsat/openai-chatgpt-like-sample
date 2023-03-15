type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type ChatMessageResponse = {
  message: Prettify<ChatMessage>
  finish_reason: 'stop' | 'length' | 'prompt'
  index: number
}

export type MessageResponse = Prettify<ChatMessageResponse>

export const useChat = () => {
  const currentMessage = ref('')
  const messages = ref<ChatMessage[]>([])

  const addCurrentMessage = () => {
    messages.value.push({
      role: 'user',
      content: currentMessage.value,
    })
    currentMessage.value = ''
  }

  const addResponseMessage = ({ role, content }: ChatMessageResponse['message']) => {
    messages.value.push({ role, content })
  }

  const copyAllMessages = () => {
    const { copy } = useClipboard()
    const textToCopy = messages.value.map(({ role, content }) => {
      return `${role}:\n ${content}`
    }).join('\n\n')
    copy(textToCopy)
  }

  const resetAllMessages = () => {
    messages.value = []
  }

  return {
    currentMessage,
    messages: readonly(messages),
    addCurrentMessage,
    addResponseMessage,
    copyAllMessages,
  }
}
