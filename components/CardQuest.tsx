// components/Card.tsx
import { ICardQuestProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export function CardQuest({ quest, onSwipeUp }: ICardQuestProps) {
  const panY = useRef(new Animated.Value(0)).current;
  const [isSwiping, setIsSwiping] = useState(false);

  const SWIPE_VERTICAL = 150;

  const panResponderVer = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsSwiping(true);
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0 && !isSwiping) {
          panY.setValue(gesture.dy);
        } else if (gesture.dy < 0) {
          panY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -SWIPE_VERTICAL) {
          Animated.timing(panY, {
            toValue: -height,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            panY.setValue(0);
            setIsSwiping(false);
            onSwipeUp?.();
          });
        } else {
          // Возвращаем на место
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => {
            setIsSwiping(false);
          });
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponderVer.panHandlers}
      style={[
        styles.card,
        {
          transform: [{ translateY: panY }],
        },
      ]}
    >
      <Text style={styles.text}>{quest}</Text>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-up-outline" size={32} color="#999" />
        <Text style={styles.swipeHint}>Показать ответ</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: height - 130,
    backgroundColor: "#0d1117",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    color: "white",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    padding: 20,
    color: "white",
  },
  arrowContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  swipeHint: {
    fontSize: 12,
    color: "#e41a1a",
    marginTop: 5,
  },
});
