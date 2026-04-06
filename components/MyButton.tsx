// components/MyButton.tsx
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface MyButtonProps {
  title: string;
  onPress: () => void;
}

export const MyButton = ({ title, onPress }: MyButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
