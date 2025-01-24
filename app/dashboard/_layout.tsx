import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import "./../../global.css"

// Custom header component with logo
const CustomHeader = () => {
  return (
    <View style={{
      position: 'absolute',
      left: 200,
      top: 0,
      bottom: 0,
      justifyContent: 'center'
    }}>
      <Image
        source={require('./../../assets/images/logo.png')}
        style={{
          width: 100,
          height: 40,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default function DashboardLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./../../assets/fonts/Poppins-Regular.ttf'),
  });

  const handleLogout = () => {
    // Add your logout logic here
    router.replace('/login');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#333',
          },
          drawerStyle: {
            backgroundColor: 'white',
          },
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#666',
          drawerActiveBackgroundColor: '#f0f0f0',
        }}
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Logout button at bottom */}
            <TouchableOpacity
              style={{
                padding: 15,
                borderTopWidth: 1,
                borderTopColor: '#eee',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={handleLogout}
            >
              <FontAwesome name="sign-out" size={24} color="#c35ddf" style={{ marginRight: 32 }} />
              <Text style={{ color: '#c35ddf', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            headerTitle: (props) => <CustomHeader {...props} />,
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color="#c35ddf" />
            ),
          }}
        />


        <Drawer.Screen
          name="reserve"
          options={{
            drawerLabel: 'Book Now',
            title: 'Book Now',
            headerTitle: (props) => <CustomHeader {...props} />,
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="calendar-plus-o" size={size} color="#c35ddf" />
            ),
          }}
        />


        <Drawer.Screen
          name="transactions"
          options={{
            drawerLabel: 'My Transactions',
            title: 'Transactions',
            headerTitle: (props) => <CustomHeader {...props} />,
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="list-alt" size={size} color="#c35ddf" />
            ),
          }}
        />


        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'My Profile',
            title: 'Profile',
            headerTitle: (props) => <CustomHeader {...props} />,
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color="#c35ddf" />
            ),
          }}
        />




      </Drawer>
    </GestureHandlerRootView>
  );
}