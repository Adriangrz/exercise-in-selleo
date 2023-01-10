import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from './PostsScreen';
import { Button } from 'react-native';
import useAuth from '../../contexts';

const Stack = createStackNavigator();

const MainStack = () => {
  const { logOut } = useAuth();

  return(
    <Stack.Navigator>
      <Stack.Screen name="Posts" component={Posts} options={{ headerRight: ()=>(
          <Button onPress={()=>logOut()} title='Log out'/>
      ) }} />
    </Stack.Navigator>
  );
};

export default MainStack;
