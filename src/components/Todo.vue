<template>
  <div style="padding-bottom: 100px;"></div>
  <div class="todo">
    <div class="todo-toolbar">
      <a-button style="margin-right: 15px;" @click="download(JSON.stringify(todos), 'todos.json')">
        <DownloadOutlined />
        <span>export list</span>
      </a-button>
      <a-upload :showUploadList="false" :beforeUpload="beforeUpload">
        <a-button>
          <UploadOutlined />
          <span>import list</span>
        </a-button>
      </a-upload>
    </div>
    <div class="todo-card">
      <div class="todo-card__header">
        <TodoControl />
      </div>
      <div class="todo-card__body">
        <div v-if="todos.length === 0" class="empty">
          <a-empty :image="simpleImage" />
        </div>
        <div v-else class="router-view-container">
          <router-view></router-view>
        </div>
      </div>
      <div class="todo-card__footer">
        <div class="footer-control">
          <div class="total">
            <strong>{{ total }}</strong>
            items left
          </div>
          <div class="router-link">
            <router-link class="router-link-item" to="/all">All</router-link>
            <router-link class="router-link-item" to="/active">Active</router-link>
            <router-link class="router-link-item" to="/completed">Completed</router-link>
          </div>
          <div class="clear-btn">
            <a-button type="link" style="padding: 0;" @click="todoContext.clearCompletedTodoItem">Clear completed</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message, Empty, UploadProps } from 'ant-design-vue'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons-vue'
import TodoControl from '@/components/TodoControl.vue'
import { Todos, useTodoInject } from '@/context/todo'
import download from '@/utils/download'

const { todos, total, ...todoContext } = useTodoInject()

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const beforeUpload: UploadProps['beforeUpload'] = (file: File) => {
  console.log(file)
  const format = file.name.split('.').pop()?.toLocaleLowerCase() ?? ''
  const isJson = format.includes('json')
  if (!isJson) {
    message.error('只支持导入json文件')
    return false
  }
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = e => {
    // 类型守卫
    if (e.target?.result && typeof e.target.result === 'string') {
      const todos = JSON.parse(e.target.result) as Todos
      if (!Array.isArray(todos)) return
      todoContext.updateTodos(todos)
    } else {
      message.error('json文件解析失败')
    }
  }
  return false
}
</script>

<style lang="less">
.todo {
  position: relative;
  max-width: 750px;
  padding: 15px;
  margin: 0 auto;

  &-toolbar {
    position: absolute;
    left: 15px;
    top: -35px;
  }

  &-card {
    max-width: 100%;
    position: relative;
    background: #ededed;
    box-shadow: 0 0 30px -5px #2c3e50;
    border-radius: 4px;
  }
}

.todo-card__header {
  padding: 14px 14px 0 14px;
}

.todo-card__body {
  position: relative;
  padding: 24px;
  min-height: 375px;

  .todo-item {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;

    .delete {
      user-select: none;
      -webkit-appearance: none;
      background-color: rgba(10, 10, 10, 0.2);
      border: none;
      border-radius: 290486px;
      cursor: pointer;
      pointer-events: auto;
      display: inline-block;
      flex-grow: 0;
      flex-shrink: 0;
      font-size: 0;
      height: 20px;
      max-height: 20px;
      max-width: 20px;
      min-height: 20px;
      min-width: 20px;
      outline: 0;
      position: relative;
      vertical-align: top;
      width: 20px;

      &::before {
        background-color: #fff;
        content: "";
        display: block;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        transform-origin: center center;

        height: 2px;
        width: 50%;
      }

      &::after {
        background-color: #fff;
        content: "";
        display: block;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        transform-origin: center center;

        height: 50%;
        width: 2px;
      }

      &:hover {
        background-color: rgba(10, 10, 10, 0.3);
      }
    }

    .is-small.delete {
      height: 16px;
      max-height: 16px;
      max-width: 16px;
      min-height: 16px;
      min-width: 16px;
      width: 16px;
    }
  }
}

.todo-card__footer {
  position: relative;
  padding: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  .footer-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .router-link {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &-item {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      min-width: 60px;
      text-align: center;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
      cursor: pointer;
      transition: border-color 0.3s ease-in-out;

      &.router-link-active {
        border-color: #2b85e4;
      }

      &:hover {
        border-color: #2b85e4;
      }
    }
  }
}

.empty {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>