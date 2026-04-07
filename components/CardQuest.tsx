// components/Card.tsx
import { CardProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export function CardQuest({
  quest,
  answer,
  onSwipeUp,
  onSwipeHor,
  isCardAnswer,
}: CardProps) {
  const panY = useRef(new Animated.Value(0)).current;
  const panX = useRef(new Animated.Value(0)).current;

  const [isSwiping, setIsSwiping] = useState(false);

  const SWIPE_VERTICAL = 150;
  const SWIPE_HORIZONTAL = 150;

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

  if (isCardAnswer) {
    console.log("isCardAnswer", isCardAnswer);
    return (
      <Animated.View
        {...panResponderHor.panHandlers}
        style={[styles.card, { transform: [{ translateX: panX }] }]}
      >
        <View>
          <Text style={styles.text}>{quest}</Text>
          <View style={ansStyles.answer}>
            <Text>{answer}</Text>
          </View>
        </View>
      </Animated.View>
    );
  } else {
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
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: height - 130,
    backgroundColor: "#2b151577",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    padding: 20,
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

const ansStyles = StyleSheet.create({
  answer: {
    borderTopWidth: 2,
    borderTopColor: "red",
    backgroundColor: "green",
  },
});

export default CardQuest;
