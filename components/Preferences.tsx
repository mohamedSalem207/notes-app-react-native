import { createSettingsStyles } from "@/assets/styles/settings-style";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function Preferences() {
  const [isAutoSync, setIsAutoSync] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const settingsStyle = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitle}>Preferences</Text>

      {/* Start of the dark mode section */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="moon" size={18} color="#fff" />
          </LinearGradient>

          <Text style={settingsStyle.settingText}>Dark Mode</Text>
        </View>

        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.primary }}
          ios_backgroundColor={colors.border}
        />
      </View>
      {/* End of the dark mode section */}

      {/* Start of the notifications section */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>

          <Text style={settingsStyle.settingText}>Notifications</Text>
        </View>

        <Switch
          value={isNotificationsEnabled}
          onValueChange={() => setIsNotificationsEnabled((prev) => !prev)}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.warning }}
          ios_backgroundColor={colors.border}
        />
      </View>
      {/* End of the notifications section */}

      {/* Start of the auto sync section */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.success}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>

          <Text style={settingsStyle.settingText}>Auto Sync</Text>
        </View>

        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync((prev) => !prev)}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.success }}
          ios_backgroundColor={colors.border}
        />
      </View>
      {/* End of the auto sync section */}
    </LinearGradient>
  );
}
