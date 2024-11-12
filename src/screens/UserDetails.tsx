import { StyleSheet, View } from "react-native";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Button, Heading, Separator } from "../components/basic";
import { NavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList } from "../navigation/types";

interface UserDetailsProps {
  navigation: NavigationProp<RootBottomTabParamList, "UserDetailScreen">;
}

const UserDetails: React.FC<UserDetailsProps> = ({ navigation }) => {
  const { user } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Heading>Name : </Heading>
        <Heading color="primaryTheme">{user?.name}</Heading>
      </View>
      <Separator height={10} />
      <View style={styles.field}>
        <Heading>Email : </Heading>
        <Heading color="primaryTheme">{user?.email}</Heading>
      </View>
      <Separator />
      <Button
        title="Go Back"
        onPress={() => navigation.navigate("ProfileScreen")}
        width={"60%"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  field: { flexDirection: "row" },
});

export default UserDetails;
