// app/_layout.tsx
import { DataProvider } from "@/contexts/DataContext";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

// 1. Объединяем темы для react-navigation и react-native-paper
const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

export default function RootLayout() {
  // 2. Определяем системную тему (light/dark)
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  // 3. Выбираем тему в зависимости от настроек системы
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <DataProvider>
      {/* @ts-ignore */}
      <ThemeProvider value={theme}>
        <PaperProvider theme={theme}>
          <Tabs
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = "help-circle";
                if (route.name === "index")
                  iconName = focused ? "home" : "home-outline";
                else if (route.name === "center")
                  iconName = focused ? "star" : "star-outline";
                else if (route.name === "profile")
                  iconName = focused ? "person" : "person-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: "gray",
              headerStyle: { backgroundColor: theme.colors.primary },
              headerTintColor: "#fff",
            })}
          >
            <Tabs.Screen name="ListQuest" options={{ title: "Список" }} />
            <Tabs.Screen name="index" options={{ title: "Главная" }} />
            <Tabs.Screen name="SwipeQuest" options={{ title: "Swipe" }} />
          </Tabs>
        </PaperProvider>
      </ThemeProvider>
    </DataProvider>
  );
}
