import { View } from "react-native";
import Screen from "./src/components/Screen";
import Heading from "./src/components/Heading";
import Text from "./src/components/Text";

export default function App() {
  return (
    <Screen>
      <View style={{ display: "flex", margin: "auto" }}>
        <Heading size={40} bottomSpace={10} bold>
          Will this work?
        </Heading>
        <Text align="center" color="lightGrayText" decoration="underline">
          Yes, It will.
        </Text>
      </View>
    </Screen>
  );
}
