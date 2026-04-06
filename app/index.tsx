import { Text, View } from "react-native";
import { MyButton } from "../components/MyButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <MyButton title="aaa" onPress={() => console.log("aaaa")} />
    </View>
  );
}
