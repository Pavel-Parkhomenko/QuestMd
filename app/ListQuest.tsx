import { useData } from "@/contexts/DataContext";
import React from "react";
import { FlatList, Text, View } from "react-native";

// import { IExercise } from "../types";

export default function QuestPage() {
  const { loading, getDataByName } = useData();

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <View>
      <FlatList
        data={[]}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}
