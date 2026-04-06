import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Главная",
          headerStyle: { backgroundColor: "#6200ee" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "О нас",
          headerStyle: { backgroundColor: "#6200ee" },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
