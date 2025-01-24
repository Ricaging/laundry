import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="items-center pt-12 px-8">
          <Link href="/" asChild>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/logo.png')}
                className="w-[100px] h-[100px] mb-8"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Link>
          <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-2xl font-light text-gray-800 mb-8">Welcome Back</Text>
        </View>

        {/* Form */}
        <View className="px-8 space-y-4">
          <View>
            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-600 mb-2 text-base">Email</Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl">
              <View className="p-3">
                <Ionicons name="mail-outline" size={22} color="#6B7280" />
              </View>
              <TextInput style={{ fontFamily: 'Poppins-Regular' }}
                className="flex-1 px-2 py-3 mb-2 text-gray-800"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-600 mb-2 text-base">Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl">
              <View className="p-3">
                <Ionicons name="lock-closed-outline" size={22} color="#6B7280" />
              </View>
              <TextInput style={{ fontFamily: 'Poppins-Regular' }}
                className="flex-1 px-2 py-3 mb-2 text-gray-800"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="p-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity className="items-end">
            <View className="flex-row items-center mt-2">
              <Ionicons name="key-outline" size={16} color="#8327b2" />
              <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-[#8327b2] text-sm ml-1">Forgot Password?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#8327b2] py-4 rounded-xl items-center mt-6 flex-row justify-center"
            onPress={() => router.push("/dashboard/")}
          >
            <Ionicons name="log-in-outline" size={20} color="white" />
            <Text className="text-white text-base font-light tracking-wider ml-2">Login</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-6">
            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-600">Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity className="flex-row items-center">
                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-[#8327b2]">Sign Up</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="#8327b2" className="ml-1" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
