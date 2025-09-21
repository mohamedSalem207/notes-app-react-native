import { createSettingsStyles } from "@/assets/styles/settings-style";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

export default function ProgressStats() {
  const { colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitle}>Progress Status</Text>

      {/* Start of the total todos */}
      <LinearGradient
        colors={colors.gradients.background}
        style={[
          settingsStyles.statCard,
          {
            borderLeftColor: colors.primary,
          },
        ]}
      >
        <View style={settingsStyles.statIconContainer}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingsStyles.statIcon}
          >
            <Ionicons name="list" size={20} color="#fff" />
          </LinearGradient>
        </View>

        <View>
          <Text style={settingsStyles.statNumber}>{totalTodos}</Text>

          <Text style={settingsStyles.statLabel}>Total Todos</Text>
        </View>
      </LinearGradient>
      {/* End of the total todos */}

      {/* Start of the completed todos */}
      <LinearGradient
        colors={colors.gradients.background}
        style={[
          settingsStyles.statCard,
          {
            borderLeftColor: colors.success,
          },
        ]}
      >
        <View style={settingsStyles.statIconContainer}>
          <LinearGradient
            colors={colors.gradients.success}
            style={settingsStyles.statIcon}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
          </LinearGradient>
        </View>

        <View>
          <Text style={settingsStyles.statNumber}>{completedTodos}</Text>

          <Text style={settingsStyles.statLabel}>Completed Todos</Text>
        </View>
      </LinearGradient>
      {/* End of the completed todos */}

      {/* Start of the active todos */}
      <LinearGradient
        colors={colors.gradients.background}
        style={[
          settingsStyles.statCard,
          {
            borderLeftColor: colors.warning,
            marginBottom: 0,
          },
        ]}
      >
        <View style={settingsStyles.statIconContainer}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={settingsStyles.statIcon}
          >
            <Ionicons name="time" size={20} color="#fff" />
          </LinearGradient>
        </View>

        <View>
          <Text style={settingsStyles.statNumber}>{activeTodos}</Text>

          <Text style={settingsStyles.statLabel}>Active Todos</Text>
        </View>
      </LinearGradient>
      {/* End of the active todos */}
    </LinearGradient>
  );
}
