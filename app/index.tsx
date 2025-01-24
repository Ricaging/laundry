import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import Login from './login';
import SignUp from './signup';



const index = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Logo and Header Section */}
        <View className="items-center pt-16 px-8">
          <Image
            source={require('../assets/images/logo.png')}
            className="w-[150px] h-[150px] mb-4"
            resizeMode="contain"
          />
         
          <Text style={{fontFamily: 'Poppins-Regular'}} className="text-base text-gray-500 text-center tracking-wide">
          Wash Away Your Worries – We’ve Got Your Laundry Covered!
          </Text>
        </View>

        {/* Main Image */}
        <View className="flex-1 px-8 my-12">
          <Image
            source={require('../assets/images/about.jpg')}
            className="w-full h-full rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* Buttons */}
        <View className="px-8 space-y-4 mb-8">
          <Link href="/login" asChild>
            <TouchableOpacity 
              className="bg-[#8327b2] py-4 rounded-xl items-center mb-5" 
            >
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white text-base font-light tracking-wider">Login</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/signup" asChild>
            <TouchableOpacity 
              className="border border-gray-900 py-4 rounded-xl items-center" 
            >
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-900 text-base font-light tracking-wider">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={{fontFamily: 'Poppins-Regular'}} className="text-xs text-gray-400 text-center mb-6">
          &copy; 2025 LaundryBest All Rights Reserved
        </Text>
      </SafeAreaView>
    </>
  );
};


export default index;
