import { useData } from "@/contexts/DataContext";
import { IListData } from "@/types";
import { Accordion } from "@animatereactnative/accordion";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

export default function ListQuest() {
  const [checked, setChecked] = useState(false);
  const { loading, error, getMapData } = useData();
  const [data, setData] = useState<IListData[]>([]);
  // const [curTheme, setCurTheme] = useState()

  useEffect(() => {
    const result = Array.from(getMapData(), ([name, exercises]) => ({
      name,
      exercises,
    }));
    setData([...result]);
  }, [getMapData]);

  return (
    <View>
      <Accordion.Accordion>
        <Accordion.Header>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Заголовок (как)
          </Text>
        </Accordion.Header>
        <Accordion.Expanded>
          <Text>
            Это контент, который появляется при открытии. Сюда можно поместить
            что угодно: текст, картинки, списки.
          </Text>
        </Accordion.Expanded>
      </Accordion.Accordion>

      {data.map((item) => {
        return (
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color="#6200ee"
            uncheckedColor="#757575"
            key={item.name}
          />
        );
      })}
    </View>
  );
}
