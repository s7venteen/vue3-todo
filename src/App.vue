<template>
  <Todo />
</template>

<script setup lang="ts">
import Todo from '@/components/Todo.vue'
import { useTodoProvide } from '@/context/todo'
useTodoProvide()
</script>