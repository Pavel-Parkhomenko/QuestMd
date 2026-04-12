// components/Card.tsx
import { ICardAnswerProps } from "@/types";
import React from "react";
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Markdown } from "react-native-remark";
// import Markdown from "react-native-markdown-display";
// import MarkdownWebView from "react-native-github-markdown";

const { width, height } = Dimensions.get("window");

export function CardAnswer({ answer, quest, showQuest }: ICardAnswerProps) {
  return (
    <View style={[styles.card]}>
      <View>
        <Text style={styles.text}>{quest}</Text>
        <View style={styles.answer}>
          <Markdown
            markdown={answer}
            customRenderers={{
              // Override default renderers for mdast nodes.
              // Checkout https://github.com/imwithye/react-native-remark/blob/main/src/renderers/index.tsx
              // for the default renderers.
              InlineCodeRenderer: ({ node }) => (
                <Text style={{ color: "blue" }}>{node.value}</Text>
              ),
              ThematicBreakRenderer: () => (
                <View style={{ height: 5, backgroundColor: "red" }} />
              ),
            }}
            customStyles={{
              // Override default styles
              // Checkout https://github.com/imwithye/react-native-remark/blob/main/src/themes/default.tsx
              // for the default styles.
              inlineCode: {
                color: "red",
              },
              text: {
                color: "red",
              },
            }}
            onLinkPress={(url) => Linking.openURL(url)}
          />
          {/* <Text>{answer}</Text> */}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => showQuest()}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Новый вопрос</Text>
      </TouchableOpacity>
    </View>
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
