export const usePrompt = () => {
  const currentMessage = ref('')
  const messages = ref<string[]>([])
  const prompt = computed(() => {
    return messages.value.join('\n\n') + '\n'
  })

  const addMessage = (text?: string) => {
    messages.value.push(text ?? currentMessage.value)
    currentMessage.value = ''
  }

  const copyAllMessages = () => {
    const { copy } = useClipboard()
    copy(prompt.value)
  }

  const resetAllMessages = () => {
    messages.value = []
  }

  return {
    currentMessage,
    messages,
    prompt,
    addMessage,
    copyAllMessages,
  }
}
