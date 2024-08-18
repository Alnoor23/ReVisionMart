import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Heading, Separator } from "../components/basic";
import { useAuthContext } from "../context/AuthContext";
import { deleteAuthToken } from "../storage/authStorage";

const Profile = () => {
  const { user, setAuthToken } = useAuthContext();

  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" align="center">
        {user?.name}
      </Heading>
      <Separator />
      <Button
        title="LOGOUT"
        onPress={() => {
          setAuthToken(null);
          deleteAuthToken();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default Profile;
