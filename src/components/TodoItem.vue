<template>
  <div class="todos">
    <div class="todo-item" v-for="(item, index) in autoTodos" :key="item.id">
      <a-checkbox v-model:checked="item.checked">
        <a-typography-text :delete="item.checked">{{ item.value }}</a-typography-text>
      </a-checkbox>
      <button class="delete is-small" @click="deleteTodoItem(index)"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoInject } from '@/context/todo'
const { autoTodos, deleteTodoItem } = useTodoInject()
</script>