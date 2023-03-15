<script setup lang="ts">
const {
  Cmd_c,
  Ctrl_c,
  cmd,
  ctrl,
  current,
} = useMagicKeys()

const shortcutCopy = computed(() => Cmd_c.value || Ctrl_c.value)
const shortcutSend = computed(() => current.has('enter') && (cmd.value || ctrl.value))

const {
  currentMessage,
  messages,
  prompt,
  addMessage,
  copyAllMessages,
} = usePrompt()

watch(shortcutCopy, (value) => {
  if (value) {
    copyAllMessages()
  }
})

watch(shortcutSend, (value) => {
  if (value) {
    submit()
  }
})

const submit = async () => {
  addMessage()

  const method = 'POST'
  const body = { prompt: prompt.value }
  const { data, error } = await useFetch('/api/generate', {
    method,
    body,
  })

  if (error.value) {
    console.error(error.value)
  } else {
    addMessage(data.value?.result)
  }
}


</script>

<template>
  <div class="p-4 md:p-8 h-screen bg-blue-gray-700">
    <div class="p-4 md:p-8 max-h-full overflow-y-scroll bg-blue-gray-600">
      <div class="flex flex-col gap-4">
        <ACard
          v-for="(message, i) in messages"
          :key="i"
          :text="message"
          class="bg-blue-gray-500 text-white text-lg whitespace-pre-wrap"
        />
        <ATextarea
          v-model="currentMessage"
          class="bg-blue-gray-700 text-white text-lg"
        />
      </div>
    </div>
  </div>
  <Html class="dark" />
</template>
