import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/form";
import { Heading, Separator, Text } from "../components/basic";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { scale } from "react-native-size-matters";
import { signUp } from "../api/user";
import { useAuthContext } from "../context/AuthContext";
import { storeAuthToken } from "../storage/authStorage";

interface SignUpScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "SignUpScreen">;
}

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { setUser, setAuthToken } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(15, "Name cannot exceed 15 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .min(5, "Email must be at least 5 characters long")
      .max(255, "Email cannot exceed 255 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(1024, "Password cannot exceed 1024 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      setLoading(true);
      setError("");

      const { data, status, headers } = await signUp(values);
      console.log(data);

      if (status !== 200) {
        setError(data?.message || "An unexpected error occurred.");
        return;
      }

      if (data) setUser(data);
      if (headers?.["x-auth-token"]) {
        setAuthToken(headers["x-auth-token"]);
        storeAuthToken(headers["x-auth-token"]);
      }

      navigation.navigate("HomeNavigatorScreen");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.log("ERROR THIS:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" size={32} bottomSpace={40} bold>
        Sign Up
      </Heading>

      <View style={styles.formContainer}>
        <Form<SignUpFormValues>
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

          <View style={styles.termsContainer}>
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

          <SubmitButton title="SIGN UP" bold loading={loading} />
          <ErrorMessage error={error} visible={!!error} />

          <View style={styles.bottomMessageContainer}>
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
  termsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  bottomMessageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "auto",
    marginTop: 12,
    marginBottom: 40,
  },
});

export default SignUp;
