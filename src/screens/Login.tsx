import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Heading, Separator, Text } from "../components/basic";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/form";
import Checkbox from "expo-checkbox";
import * as Yup from "yup";
import colors from "../config/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { scale } from "react-native-size-matters";
import { login } from "../api/user";
import AuthContext from "../context/AuthContext";
import { storeAuthToken } from "../storage/authStorage";

interface LoginScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "LoginScreen">;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [rememberCreds, setRememberCreds] = useState(false);

  const validationSchema = Yup.object({
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

  const handleSubmit = async (values: LoginFormValues) => {
    console.log(values, { rememberCreds: rememberCreds });

    try {
      setLoading(true);
      setError("");

      const { data, status } = await login(values);
      console.log(data);

      if (status !== 200) {
        setError(data?.message || "An unexpected error occurred.");
        return;
      }

      if (data?.token) {
        authContext?.setAuthToken(data.token);
        if (rememberCreds) storeAuthToken(data.token);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log("ERROR THIS:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" size={32} bottomSpace={40} bold>
        Login
      </Heading>

      <View style={styles.formContainer}>
        <Form<LoginFormValues>
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormField
            name="email"
            keyboardType="email-address"
            placeholder="Email"
          />
          <Separator height={5} />
          <FormField name="password" placeholder="Password" password />
          <Separator height={15} />
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={rememberCreds}
              onValueChange={() => setRememberCreds(!rememberCreds)}
              color={rememberCreds ? colors.primaryTheme : colors.mediumGray}
            />
            <TouchableWithoutFeedback
              onPress={() => setRememberCreds(!rememberCreds)}
            >
              <Text color="mediumGray" size={12}>
                Remember Me
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.forgotPassword}>
            <Text size={12}>Forgot password? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text size={12} color="primaryTheme">
                Click here
              </Text>
            </TouchableOpacity>
          </View>

          <SubmitButton title="LOGIN" bold loading={loading} />
          <ErrorMessage error={error} visible={!!error} />

          <View style={styles.bottomMessageContainer}>
            <Text size={12}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text size={12} color="primaryTheme" decoration="underline">
                Sign up
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
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    height: 16,
    width: 16,
    marginRight: 4,
  },
  forgotPassword: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 5,
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

export default Login;
