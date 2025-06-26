import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screen1 from "../src/Screen1";
import Screen2 from "../src/Screen2";
import Screen3 from "../src/Screen3";

import LoginScreen from "../auth/LoginScreen";
import RegistroScreen from "../auth/RegistroScreen";

import WelcomeScreen from "../src/WelcomeScreen";
import Screen4 from "../src/Screen4";





const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


function MyStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
             <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name= 'tabs' component={MyTabs} />
            <Tab.Screen name="Screen3"component={Screen3}/>

             
            
          
        </Stack.Navigator>
    )
}


function MyTabs(){
    return(
        <Tab.Navigator >
            <Tab.Screen name="Lista"component={Screen1}/>
            <Tab.Screen name="crear"component={Screen2}/>
            <Tab.Screen name="Perfil"component={Screen4}/>
            
            
            

        </Tab.Navigator>
    )
}

export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}