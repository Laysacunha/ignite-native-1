import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {

  const [idEditing, setIdEditing] = useState<number>()
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const activeEditing = (id: number, oldTaskTitle: string) => {
    setNewTaskTitle(oldTaskTitle)
    setIdEditing(id)
  }
  const cancelEditing = (id: number) => {
    setNewTaskTitle('')
    setIdEditing(undefined)
  }

  const confirmTitle = () => {
    setNewTaskTitle(newTaskTitle)
    if (idEditing !== undefined) editTask(idEditing, newTaskTitle)
    setIdEditing(undefined)
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View>
              {
                idEditing !== item.id ? (
                  <TouchableOpacity
                    style={styles.taskButton}
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    onPress={() => toggleTaskDone(item.id)}
                  //TODO - use onPress (toggle task) prop
                  >
                    <View
                      testID={`marker-${index}`}
                      style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    //TODO - use style prop 
                    >
                      {item.done && (
                        <Icon
                          name="check"
                          size={12}
                          color="#FFF"
                        />
                      )}
                    </View>
                    <Text
                      style={item.done ? styles.taskTextDone : styles.taskText}
                    //TODO - use style prop
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )
                  :
                  <TextInput
                    value={newTaskTitle}
                    onChangeText={setNewTaskTitle}
                    onSubmitEditing={confirmTitle}
                  />
              }
            </View>
            <View
              style={{ flexDirection: 'row' }}
              testID={`actionsContainer-${index}`}
            >
              {idEditing !== item.id ?
                <TouchableOpacity
                  style={styles.actionIcon}
                  onPress={() => activeEditing(item.id, item.title)}
                //TODO - use onPress (remove task) prop
                >
                  <Image source={editIcon} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={styles.actionIcon}
                  onPress={() => cancelEditing(item.id)}
                //TODO - use onPress (remove task) prop
                >
                  <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
              }
              <View style={styles.separator} />

              <TouchableOpacity
                onPress={() => removeTask(item.id)}
                style={styles.actionIcon}

              //TODO - use onPress (remove task) prop
              >
                <Image source={trashIcon} style={{ opacity: idEditing === item.id ? 0.2 : 1 }} />
              </TouchableOpacity>
            </View>
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  },
  actionIcon: {
    paddingHorizontal: 12
  }
})