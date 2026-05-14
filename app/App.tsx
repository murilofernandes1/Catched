import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/home/index";
import CollectionScreen from "./src/screens/collection/index";
import { RootStackParamList } from "./src/types/navigation-types";
import Login from "./src/screens/login";
import { getToken } from "./src/services/auth-storage";
import Map from "./src/screens/map/index";
import Camera from "./src/screens/camera/index";
import Profile from "./src/screens/profile";
import * as NavigationBar from "expo-navigation-bar";
import { AuthContext } from "./src/contexts/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Collection" component={CollectionScreen} />
    <Stack.Screen name="Map" component={Map} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Camera" component={Camera} />
  </Stack.Navigator>
);

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  useEffect(() => {
    async function hideBars() {
      await NavigationBar.setVisibilityAsync("hidden");
    }

    hideBars();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        {token ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
