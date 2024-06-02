import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Heading, Text } from "../components/basic";
import { Form, FormField, SubmitButton } from "../components/form";
import * as Yup from "yup";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { scale } from "react-native-size-matters";

interface ForgotPasswordScreenProp {
  navigation: StackNavigationProp<RootStackParamList, "ForgotPasswordScreen">;
}

const ForgotPassword: React.FC<ForgotPasswordScreenProp> = ({ navigation }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email().min(5).max(255).required(),
  });

  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" size={32} bottomSpace={40} bold>
        Forgot Password
      </Heading>

      <View style={styles.formContainer}>
        <Form
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          <FormField
            name="email"
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          <SubmitButton title="CONFIRM" bold />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "auto",
              marginTop: 12,
              marginBottom: 40,
            }}
          >
            <Text size={12}>Don't want to continue? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text size={12} color="primaryTheme">
                Go back
              </Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(20),
  },
  formContainer: { width: "100%" },
});

export default ForgotPassword;
