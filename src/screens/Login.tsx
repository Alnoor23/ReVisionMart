import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Heading, Separator, Text } from "../components/basic";
import { Form, FormField, SubmitButton } from "../components/form";
import Checkbox from "expo-checkbox";
import * as Yup from "yup";
import colors from "../config/colors";

const Login = () => {
  const [rememberCreds, setRememberCreds] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().min(5).max(255).required(),
    password: Yup.string().min(8).max(1024).required(),
  });

  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" size={32} bottomSpace={40} bold>
        Login
      </Heading>

      <View style={styles.formContainer}>
        <Form
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
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
              marginBottom: 5,
            }}
          >
            <Checkbox
              style={{
                height: 16,
                width: 16,
                marginRight: 4,
              }}
              value={rememberCreds}
              onValueChange={() => setRememberCreds(!rememberCreds)}
              color={rememberCreds ? colors.primaryTheme : colors.mediumGray}
            />
            <Text color="mediumGray" size={12}>
              Remember Me
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginVertical: 5,
            }}
          >
            <Text size={12}>Forgot password? </Text>
            <TouchableOpacity>
              <Text size={12} color="primaryTheme">
                Click here
              </Text>
            </TouchableOpacity>
          </View>
          <SubmitButton title="LOGIN" bold />
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
            <Text size={12}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text size={12} color="primaryTheme">
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
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  formContainer: { width: "100%" },
});

export default Login;
