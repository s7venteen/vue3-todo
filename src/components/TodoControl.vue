<template>
  <div class="todo-control">
    <a-input v-model:value.trim="valueRef" placeholder="your new todo" size="large" allow-clear @press-enter="handlePressEnter" />
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoInject } from '@/context/todo'

const route = useRoute()

const { addTodoItem } = useTodoInject()

const valueRef = ref('')

const handlePressEnter = (e: Event) => {
  if (!unref(valueRef)) return
  addTodoItem(unref(valueRef))
  valueRef.value = ''
}
</script>