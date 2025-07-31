import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

type Todo = Doc<"todos">;

const Home = () => {
  const { colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  const homeStyles = createHomeStyles(colors);

  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo - ", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    console.log("Deleting");

    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteTodo({ id });
          } catch (error) {
            console.log("Error deleting todo - ", error);
            Alert.alert("Error", "Failed to delete todo");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={24} color={""} />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.5,
                },
              ]}
            >
              {item.text}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="pencil-outline" color={"#fff"} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleDeleteTodo(item._id)}
          >
            <LinearGradient
              colors={colors.gradients.danger}
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="trash-outline" color={"#fff"} />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const isLoading = todos === undefined;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <LinearGradient
      style={homeStyles.container}
      colors={colors.gradients.background}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        <Header />

        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id.toString()}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={
            <Text style={homeStyles.emptyText}>No todos available</Text>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
