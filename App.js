import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { primaryColor, secondaryColor, appName } from './src/includes/variable';
import Header from './src/components/Header';
import ItemList from './src/components/ItemList';
import Form from './src/components/Form';
import styles from './src/styles/main.js';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as database from './src/database/index';
import { useState } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Settings from './src/components/Settings';
import {  format } from 'date-fns';
// Creates the tab navigator object.
const Tab = createBottomTabNavigator();

//keep the splash screen open while fetch resources
// SplashScreen.preventAutoHideAsync()
//   .then((prevented) => {
//     console.log('prevented:', prevented);
//   })
//   .catch((error) => {
//     console.log('Prevent error:', error);
//   })

export default function App() {

  // State for the list of items.
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  useEffect(() => {
    //console.log('Loading DB');
    (async () => {
      try{
        const data = await database.load();
        if (data){
          setItems(data);
          setOriginalItems(data);
          // SplashScreen.hideAsync()
          // .then((hidden) => {
          //   console.log('Hidden:',hidden);
          // })
          // .catch((error) => {
          //   console.log('error',error);
          // })
        }
      } catch(error){
        console.log(err);
      }
    })();
    
  },[]);

  // Include a new item to the list.
  const onAddItem = (id, itemDescription, itemQuantity,itemCost,purchaseDate,expiryDate) => {
    try{
     console.log('Expiry Date : ', expiryDate);
      const updatedItems = [...items];
      updatedItems.push(
        {
          id: id,
          itemDescription: itemDescription,
          itemQuantity: itemQuantity,
          itemCost: itemCost,
          purchaseDate: purchaseDate,
          expiryDate: expiryDate
        }
      );
      // console.log('Updated Items',updatedItems);
      setItems(updatedItems);
      setOriginalItems(updatedItems);
    }
    catch(err){
          console.error(err)
    }
  }

  // Remove an item.
  const handleItemRemoval = (id) => {
    const updatedItems = items.filter(
      (item) => item.id !== id
    );
    setItems(updatedItems);
    setOriginalItems(updatedItems);
  }

  const handleSearchItem = ((searchText) => {
    var updatedItems = [...items];
    console.log('Updated items',updatedItems);
    console.log('Search Text : ', searchText)
    if (searchText !== '') {
      
      updatedItems = updatedItems.filter(
        (item) => item.itemDescription.toLowerCase()
        .includes(searchText.toLowerCase()) ||
         //item.itemQuantity.toLowerCase().includes(searchText.toLowerCase()) || 
         //item.itemCost.toLowerCase().includes(searchText.toLowerCase()) ||
         //item.purchaseDate.toLowerCase().includes(searchText.toLowerCase()) ||
         format(new Date(item.expiryDate.seconds * 1000),'dd/MM/yyyy').includes(searchText.toLowerCase())
      );
      setItems(updatedItems);
    } else {
      setItems(originalItems);
    }
  })
  return (
    <Provider store={store}>
    <NavigationContainer>
    <View style = {styles.containter} >
      <StatusBar style="auto" />
      <Header />
      {/* <Summary></Summary> */}
      <Tab.Navigator>
          <Tab.Screen name='List' options={{
            headerShown: false,
            title: 'List Items',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='list-ul' size={size} color={color} />
            )
          }}>
            {(props) => (
              <ItemList {...props} items={items} onItemRemoval={handleItemRemoval}
              onItemSearch={handleSearchItem} />
            )}
          </Tab.Screen>
          <Tab.Screen name='Add' options={{
            title: 'Add Item',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: primaryColor
            },
            tabBarIcon: ({ color, size }) => (
              <Entypo name='add-to-list' size={size} color={color} />
            )
          }}>
            {(props) => (
              <Form {...props} onAddItem={onAddItem} />
            )}
          </Tab.Screen>

          <Tab.Screen name='Settings' options={{
            title: 'Settings',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: primaryColor
            },
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" size={size} color={color} />
            )
          }}>
            {(props) => (
              <Settings {...props} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
    </View>
    </NavigationContainer>
    </Provider>
  );
}
