import { provide, inject, unref, computed, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage, RemovableRef } from '@vueuse/core'
import { nanoid } from 'nanoid'

export interface TodoItem extends Object {
  id: string
  value: string
  checked: boolean
}

export type Todos = TodoItem[]

export interface TodoContext {
  todos: RemovableRef<Todos>
  total: number 
  autoTodos: ComputedRef<Todos>
  updateTodos: (todos: Todos) => void
  addTodoItem: (value: string) => void
  deleteTodoItem: (index: number) => void,
  clearCompletedTodoItem: () => void
}

enum TodoType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

const TodoSymbol = Symbol()

export function useTodoProvide() {
  const route = useRoute()

  // state
  const todos = useLocalStorage<Todos>('todos', [{
    id: nanoid(),
    value: 'your first todo',
    checked: false
  }])

  // getter
  const total = computed(() => unref(todos).filter(todo => !todo.checked).length)

  const autoTodos = computed(() => {
    const type = route.path.split('/')[1]
    const map = new Map<string, Todos>([
      [TodoType.ALL, unref(todos)],
      [TodoType.ACTIVE, todos.value.filter(todo => !todo.checked)],
      [TodoType.COMPLETED, todos.value.filter(todo => todo.checked)],
    ])
    return map.get(type)
  })

  // action
  const updateTodos = (source: Todos) => {
    todos.value = source
  }

  const addTodoItem = (value: string) => {
    todos.value.unshift({
      id: nanoid(),
      value,
      checked: false
    })
  }

  const deleteTodoItem = (index: number) => {
    todos.value.splice(index, 1)
  }

  const clearCompletedTodoItem = () => {
    todos.value = todos.value.filter(todo => !todo.checked)
  }

  provide(TodoSymbol, { todos, total, autoTodos, updateTodos, addTodoItem, deleteTodoItem, clearCompletedTodoItem })
}

export function useTodoInject() {
  const todoContext = inject<TodoContext>(TodoSymbol)

  if (!todoContext) {
    throw new Error('useTodoInject must be used after useTodoProvide')
  }

  return todoContext
}