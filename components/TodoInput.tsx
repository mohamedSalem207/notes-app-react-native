import { createHomeStyles } from "@/assets/styles/home-styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function TodoInput() {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  async function handleAddTodo() {
    if (newTodo.trim()) {
      try {
        await addTodo({
          text: newTodo,
        });

        setNewTodo("");
      } catch (error) {
        console.error(error);

        Alert.alert("Error", "Failed to add todo");
      }
    }
  }

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="what needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          multiline
          placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <Text>
            <LinearGradient
              colors={
                newTodo.trim()
                  ? colors.gradients.primary
                  : colors.gradients.muted
              }
              style={[
                homeStyles.addButton,
                !newTodo.trim() && homeStyles.addButtonDisabled,
              ]}
            >
              <Ionicons name="add" size={24} color="white" />
            </LinearGradient>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
