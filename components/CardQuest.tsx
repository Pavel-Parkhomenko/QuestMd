import { ICardQuestProps } from "@/types";
import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

export function CardQuest({ quest, showAnswer }: ICardQuestProps) {
  return (
    <Animated.View style={[styles.container]}>
      <Animated.View style={[styles.questionContainer]}>
        <Animated.Text style={[styles.questionText]}>{quest}</Animated.Text>
      </Animated.View>

      <TouchableOpacity
        onPress={() => showAnswer()}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Ответ</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  questionContainer: {
    marginTop: 130,
    width: "80%",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
  },
  answerContainer: {
    width: "96%",
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  answerText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    lineHeight: 24,
  },
});
