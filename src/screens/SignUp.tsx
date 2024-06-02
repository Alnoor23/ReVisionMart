import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "../components/form";
import { Heading, Separator, Text } from "../components/basic";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { FormikValues } from "formik";
import { scale } from "react-native-size-matters";

interface SignUpScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "SignUpScreen">;
}

const SignUp: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().min(5).max(255).required(),
    password: Yup.string().min(8).max(1024).required(),
  });

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
    navigation.navigate("HomeNavigatorScreen");
  };

  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" size={32} bottomSpace={40} bold>
        Sign Up
      </Heading>

      <View style={styles.formContainer}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormField name="name" placeholder="Username" />

          <FormField
            name="email"
            keyboardType="email-address"
            placeholder="Email"
          />
          <Separator height={5} />

          <FormField name="password" placeholder="Password" password />

          <Separator height={15} />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text size={10}>By continuing, you agree to our </Text>
            <TouchableOpacity>
              <Text size={10} color="primaryTheme">
                Terms and Conditions
              </Text>
            </TouchableOpacity>
            <Text size={10}> and </Text>
            <TouchableOpacity>
              <Text size={10} color="primaryTheme">
                Privacy Policies
              </Text>
            </TouchableOpacity>
          </View>

          <SubmitButton title="SIGN UP" bold />

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
            <Text size={12}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text size={12} color="primaryTheme" decoration="underline">
                login
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

export default SignUp;
