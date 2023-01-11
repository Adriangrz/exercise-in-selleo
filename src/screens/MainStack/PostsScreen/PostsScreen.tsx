import { Button, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from 'react';
import styles from "./styles";
import { CreatePostType, PostType } from "../../../types";
import { Formik } from "formik";

const PostsScreen = ()=>{
    const [isLoading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostType[]>([]);

    const getPosts = ()=>{
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response)=>response.json())
        .then((json)=>setPosts(json))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
    }
    const addPost = (values:CreatePostType,setSubmitting:any,resetForm:any) => {
      const post: PostType = {id:posts[posts.length-1].id+1,title:values.title};
      setPosts(previousState=>[...previousState,post]);
      setSubmitting(false);
      resetForm();
    }

    useEffect(()=>{
      setLoading(true);
      getPosts();
    },[]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={StatusBar.currentHeight!}
            >
            {isLoading ? <Text>Loading...</Text> :
            (
                <FlatList
                    data={posts}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => <Text style={styles.item}>{item.title}  </Text>}
                />
            )}
            <Formik
                initialValues={{ title: '' }}
                onSubmit={(values, { setSubmitting, resetForm }) => addPost(values,setSubmitting,resetForm)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
              <TextInput
                style={styles.input}
                placeholder="title"
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={false}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <Button onPress={()=>handleSubmit()} title="Add" />  
              </View>              
              )}
              </Formik>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default PostsScreen;