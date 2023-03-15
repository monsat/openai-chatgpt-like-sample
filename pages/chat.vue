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

const fetching = ref(false)

const {
  currentMessage,
  messages,
  addCurrentMessage,
  addResponseMessage,
  copyAllMessages,
} = useChat()

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
  addCurrentMessage()
  fetching.value = true

  const method = 'POST'
  const body = { messages: messages.value }
  const { data, error } = await useFetch('/api/chat', {
    method,
    body,
  }).finally(() => {
    fetching.value = false
  })

  if (error.value) {
    console.error(error.value)
  } else {
    console.log(data.value?.results)
    data.value!.results.map(({ message }) => addResponseMessage(message))
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
          :text="message.content.trim()"
          :class="{ 'bg-blue-gray-500': message.role === 'user', 'bg-blue-gray-700': message.role !== 'user' }"
          class="text-white text-lg whitespace-pre-wrap"
        />
        <ACard
          v-if="fetching"
          text="reading..."
          class="bg-blue-gray-300 text-blue-gray-700 text-lg whitespace-pre-wrap"
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
