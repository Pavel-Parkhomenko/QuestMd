import { Text, View } from "react-native";
import { MyButton } from "../components/MyButton";
// import QuestPage from "./QuestPage";

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
      {/* <QuestPage /> */}
      <MyButton title="aaa" onPress={() => console.log("aaaa")} />
    </View>
  );
}
