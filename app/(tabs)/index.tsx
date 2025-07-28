import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const { toggleDarkMode } = useTheme();
  const todos = useQuery(api.todos.getTodos);

  console.log(todos);

  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodo = useMutation(api.todos.deleteAllTodo);

  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          toggleDarkMode();
        }}
      >
        <Text>Click to change theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          addTodo({ text: "New Todo" });
        }}
      >
        <Text>Add new Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          clearAllTodo();
        }}
      >
        <Text>Delete All Todos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
