import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([...tasks, { id: new Date().getTime(), title: newTaskTitle, done: false }])
    //TODO - add new task

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task
    })
    setTasks(updatedTasks)
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
    //TODO - remove task from state
  }

  function editTask(id: number, newTaskTitle: string) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.title = newTaskTitle
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput
        addTask={handleAddTask}
        verifyTaskTitle={verifyTaskTitle}
        tasks={tasks} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={editTask}
        verifyTaskTitle={verifyTaskTitle}
      />
    </View>
  )
}

export const verifyTaskTitle = (newTaskTitle: string, tasks: Task[]) => {
  let found = tasks.some(task => task.title === newTaskTitle)
  if (found) {
    Alert.alert(
      'Task já cadastrada',
      'Você não pode cadastrar uma task com o mesmo nome.',
      [
        { text: "OK" }
      ]
    )
  }
  return found
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})