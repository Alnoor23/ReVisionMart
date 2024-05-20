import { View } from "react-native";
import Screen from "./src/components/Screen";
import Heading from "./src/components/Heading";
import Text from "./src/components/Text";
import Input from "./src/components/Input";
import Button from "./src/components/Button";
import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState<string>("");

  return (
    <Screen>
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Heading size={40} bottomSpace={10} bold>
          Will this work?
        </Heading>

        <Text
          bottomSpace={20}
          align="center"
          color="lightGrayText"
          decoration="underline"
        >
          {message ? message : "Yes, It will."}
        </Text>

        <Input
          inputContainerStyle={{
            borderWidth: 2,
            width: "80%",
            padding: 10,
            borderColor: "#cfcfcf",
          }}
          placeholder="Enter Something"
          borderRadius={10}
          onChangeText={(text) => setMessage(text)}
        />

        <Button
          title="Click Me!"
          onPress={() => console.log("message value:", message)}
          textColor="white"
          width={"80%"}
        />
      </View>
    </Screen>
  );
}
