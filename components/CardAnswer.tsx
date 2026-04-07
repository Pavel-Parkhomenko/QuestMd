// components/Card.tsx
import { ICardAnswerProps } from "@/types";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Markdown } from "react-native-remark";

const { width, height } = Dimensions.get("window");

export function CardAnswer({ answer, quest, onSwipeHor }: ICardAnswerProps) {
  const panX = useRef(new Animated.Value(0)).current;
  const [isSwiping, setIsSwiping] = useState(false);

  const SWIPE_HORIZONTAL = 150;

  const panResponderHor = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsSwiping(true);
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0 && !isSwiping) {
          panX.setValue(gesture.dx);
        } else if (gesture.dx < 0) {
          panX.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -SWIPE_HORIZONTAL) {
          Animated.timing(panX, {
            toValue: -width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            panX.setValue(0);
            setIsSwiping(false);
            onSwipeHor?.();
          });
        } else if (gesture.dx > SWIPE_HORIZONTAL) {
          Animated.timing(panX, {
            toValue: width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            panX.setValue(0);
            setIsSwiping(false);
            onSwipeHor?.();
          });
        } else {
          Animated.spring(panX, {
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
      {...panResponderHor.panHandlers}
      style={[styles.card, { transform: [{ translateX: panX }] }]}
    >
      <View>
        <Text style={styles.text}>{quest}</Text>
        <View style={styles.answer}>
          <Markdown markdown={answer} />
        </View>
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
    justifyContent: "space-between",
    overflowY: "scroll",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    padding: 20,
    color: "white",
  },
  answer: {
    borderTopWidth: 2,
    borderTopColor: "red",
  },
});
