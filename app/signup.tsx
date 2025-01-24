import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../components/CountryData';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nationality, setNationality] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="items-center pt-12 px-8">
            <Link href="/" asChild>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/logo.png')}
                  className="w-[100px] h-[100px] mb-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Link>
            <Text style={{fontFamily: 'Poppins-Regular'}} className="text-2xl font-light text-gray-800 mb-5">Create Account</Text>
          </View>

          {/* Form */}
          <View className="px-8 space-y-4">
            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600 mb- text-base">First Name</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl">
                <View className="p-3">
                  <Ionicons name="person-outline" size={22} color="#6B7280" />
                </View>
                <TextInput style={{fontFamily: 'Poppins-Regular'}}
                  className="flex-1 px-2 py-3 mb-2 text-gray-800"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600 mb-2 text-base">Last Name</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl">
                <View className="p-3">
                  <Ionicons name="person-outline" size={22} color="#6B7280" />
                </View>
                <TextInput style={{fontFamily: 'Poppins-Regular'}}
                  className="flex-1 px-2 py-3 mb-2 text-gray-800"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600 mb-2 text-base">Phone Number</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl">
                <View className="p-3">
                  <Ionicons name="call-outline" size={22} color="#6B7280" />
                </View>
                <TextInput style={{fontFamily: 'Poppins-Regular'}}
                  className="flex-1 px-2 py-3 mb-2 text-gray-800"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600 mb-2 text-base">Address</Text>
              <View className="flex-row items-start bg-gray-50 rounded-xl">
                <View className="p-3">
                  <Ionicons name="location-outline" size={22} color="#6B7280" />
                </View>
                <TextInput style={{fontFamily: 'Poppins-Regular'}}
                  className="flex-1 px-2 py-3 mb-2 text-gray-800"
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  numberOfLines={2}
                />
              </View>

            </View>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600 mb-2 text-base">Email</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl">
                <View className="p-3">
                  <Ionicons name="mail-outline" size={22} color="#6B7280" />
                </View>
                <TextInput style={{fontFamily: 'Poppins-Regular'}}
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
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600 mb-2 text-base">Password</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl">
                <View className="p-3">
                  <Ionicons name="lock-closed-outline" size={22} color="#6B7280" />
                </View>
                <TextInput style={{fontFamily: 'Poppins-Regular'}}
                  className="flex-1 px-2 py-3 mb-2 text-gray-800"
                  placeholder="Create a password"
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

            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600 mb-2 text-base">Confirm Password</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl">
                <View className="p-3">
                  <Ionicons name="lock-closed-outline" size={22} color="#6B7280" />
                </View>
                <TextInput style={{fontFamily: 'Poppins-Regular'}}
                  className="flex-1 px-2 py-3 mb-2 text-gray-800"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity 
                  className="p-3"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={22} 
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="bg-[#8327b2] py-4 rounded-xl items-center mt-6 flex-row justify-center">
              <Ionicons name="person-add-outline" size={20} color="white" />
              <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white text-base font-light tracking-wider ml-2">Sign Up</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center items-center my-6">
                  <Text style={{fontFamily: 'Poppins-Regular'}} className="text-gray-600">Already have an account? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity className="flex-row items-center">
                  <Text style={{fontFamily: 'Poppins-Regular'}} className="text-[#8327b2]">Login</Text>
                  <Ionicons name="arrow-forward-outline" size={16} color="#8327b2" className="ml-1" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
