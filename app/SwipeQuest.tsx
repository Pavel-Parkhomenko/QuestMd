import { CardAnswer } from "@/components/CardAnswer";
import { useData } from "@/contexts/DataContext";
import { IExercise } from "@/types";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CardQuest } from "../components/CardQuest";

export default function SwipeCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, error, getAllData } = useData();
  const [isCardAnswer, setIsCardAnswer] = useState(false);
  const [exercises, setExercises] = useState<IExercise[]>([]);

  useEffect(() => {
    setExercises(getAllData());
  }, [getAllData]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Загрузка карточек...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Ошибка загрузки</Text>
      </View>
    );
  }

  if (exercises.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Нет доступных карточек</Text>
      </View>
    );
  }

  const handleSwipeUp = () => {
    setIsCardAnswer(true);
    console.log("up", currentIndex);
  };

  const handleSwipeHor = () => {
    setIsCardAnswer(false);
    setCurrentIndex((prevInd) => prevInd + 1);
    console.log("hor", currentIndex);
  };

  if (currentIndex >= exercises.length) {
    return (
      <View style={styles.container}>
        <Text>All cards</Text>
      </View>
    );
  }

  if (isCardAnswer) {
    return (
      <View style={styles.container}>
        <CardAnswer
          quest={exercises[currentIndex].quest}
          answer={exercises[currentIndex].answer}
          onSwipeHor={handleSwipeHor}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CardQuest
        quest={exercises[currentIndex].quest}
        onSwipeUp={handleSwipeUp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151b23",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
