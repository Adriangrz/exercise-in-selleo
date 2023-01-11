import { Button, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, TextInput, TouchableWithoutFeedback, View } from "react-native";
import React from 'react';
import { Formik } from 'formik';
import styles from "./styles";
import useAuth from "../../../contexts";
import { LoginType } from "../../../types";

const LoginScreen = ()=>{
    const { setCredentials } = useAuth();

    const login =(values:LoginType,setSubmitting:any)=>{
      setCredentials(values.username);
      setSubmitting(false);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => {
            Keyboard.dismiss();
          }}
          >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={StatusBar.currentHeight!}
            >
              <Formik
                initialValues={{ username: '' }}
                onSubmit={(values, { setSubmitting }) => login(values,setSubmitting)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={styles.inner}>
                    <TextInput
                      style={styles.input}
                      placeholder="username"
                      autoCapitalize="none"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                    <Button onPress={()=>handleSubmit()} title="Save" />
                  </View>
                )}
              </Formik>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default LoginScreen;