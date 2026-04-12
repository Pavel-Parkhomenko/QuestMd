// app/_layout.tsx
import { DataProvider } from "@/contexts/DataContext";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <DataProvider>
      <Tabs>
        <Tabs.Screen name="ListQuest" options={{ title: "List" }} />
        <Tabs.Screen name="SwipeQuest" options={{ title: "Swipe" }} />
      </Tabs>
    </DataProvider>
  );
}
