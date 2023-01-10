import { FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from 'react';
import styles from "./styles";
import { PostType } from "../../../types";

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

    useEffect(()=>{
      setLoading(true);
      getPosts();
    },[]);

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
            {isLoading ? <Text>Loading...</Text> :
            (
                <FlatList
                    data={posts}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => <Text>{item.title}  </Text>}
                />
            )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default PostsScreen;