import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "../components/form";
import { Heading, Separator, Text } from "../components/basic";

const SignUp = () => {
  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(6).required(),
    email: Yup.string().email().min(5).max(255).required(),
    password: Yup.string().min(8).max(1024).required(),
  });
  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" size={32} bottomSpace={40} bold>
        Sign Up
      </Heading>

      <View style={styles.formContainer}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
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
            <TouchableOpacity>
              <Text size={12} color="primaryTheme">
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
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  formContainer: { width: "100%" },
});

export default SignUp;
