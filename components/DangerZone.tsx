import { createSettingsStyles } from "@/assets/styles/settings-style";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function DangerZone() {
  const { colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  async function handleResetApp() {
    Alert.alert(
      "Reset App",
      "⚠ This will delete All your todos permanently. This action can not be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearAllTodos();

              Alert.alert(
                "App Reset",
                `Successfully deleted ${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
              );
            } catch (error) {
              console.error(error);

              Alert.alert("Error", "Failed to reset app");
            }
          },
        },
      ]
    );
  }

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>

      <TouchableOpacity
        style={[
          settingsStyles.actionButton,
          {
            borderBottomWidth: 0,
          },
        ]}
        onPress={handleResetApp}
        activeOpacity={0.7}
      >
        <View style={settingsStyles.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingsStyles.actionIcon}
          >
            <Ionicons name="trash" size={18} color="#fff" />
          </LinearGradient>

          <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}
