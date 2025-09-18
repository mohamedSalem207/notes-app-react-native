import { createHomeStyles } from "@/assets/styles/home-styles";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc } from "@/convex/_generated/dataModel";

export type Todo = Doc<"todos">;

export default function HomeScreen() {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  function renderTodoItem(item: Todo) {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => {}}
          ></TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar />

      <SafeAreaView style={homeStyles.safeArea}>
        <Header todos={todos || []} />

        <TodoInput />

        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Text>{renderTodoItem(item)}</Text>}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
