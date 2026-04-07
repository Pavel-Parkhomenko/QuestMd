import { useData } from "@/contexts/DataContext";
import { IExercise } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { CardQuest } from "../components/CardQuest";

export default function SwipeCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <CardQuest
          quest={exercises[currentIndex].quest}
          answer={exercises[currentIndex].answer}
          onSwipeUp={handleSwipeUp}
          onSwipeHor={handleSwipeHor}
          isCardAnswer={isCardAnswer}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3e3344",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    color: "#6200ee",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
