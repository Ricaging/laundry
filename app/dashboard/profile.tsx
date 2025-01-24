import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstname: 'Rica Jane',
    lastname: 'Verances',
    phone: '09613448300',
    email: 'rica@example.com',
    address: 'Dumaguete City, Negros Oriental',
    country: 'Philippines',
  });

  const handleEditProfile = () => {
    // Handle edit profile
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center pt-8 pb-6 bg-white">
          <View className="w-24 h-24 rounded-full bg-gray-200 mb-3 overflow-hidden">
            <Image
              source={require('../../assets/images/profile.jpg')}
              className="w-full h-full"
            />
          </View>
          <Text className="text-xl font-semibold font-[Poppins-Regular] text-gray-800">
            {userData.firstname} {userData.lastname}
          </Text>
          <Text className="text-sm text-gray-500 mt-1 font-[Poppins-Regular]">
            {userData.email}
          </Text>
        </View>

        {/* Profile Information */}
        <View className="px-6 py-4 bg-gray-50">
          <Text className="text-lg font-semibold mb-4 font-[Poppins-Regular] text-gray-800">
            Personal Information
          </Text>

          {/* Information Items */}
          <View className="space-y-4">
            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-sm text-gray-500 mb-1 font-[Poppins-Regular]">First Name</Text>
              <Text className="text-base font-[Poppins-Regular]">{userData.firstname}</Text>
            </View>

            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-sm text-gray-500 mb-1 font-[Poppins-Regular]">Last Name</Text>
              <Text className="text-base font-[Poppins-Regular]">{userData.lastname}</Text>
            </View>

            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-sm text-gray-500 mb-1 font-[Poppins-Regular]">Phone Number</Text>
              <Text className="text-base font-[Poppins-Regular]">{userData.phone}</Text>
            </View>

            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-sm text-gray-500 mb-1 font-[Poppins-Regular]">Email</Text>
              <Text className="text-base font-[Poppins-Regular]">{userData.email}</Text>
            </View>

            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-sm text-gray-500 mb-1 font-[Poppins-Regular]">Address</Text>
              <Text className="text-base font-[Poppins-Regular]">{userData.address}</Text>
            </View>

            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-sm text-gray-500 mb-1 font-[Poppins-Regular]">Country</Text>
              <Text className="text-base font-[Poppins-Regular]">{userData.country}</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            className="mt-6 bg-[#8327b2] py-3 rounded-lg items-center"
            onPress={handleEditProfile}
          >
            <Text className="text-white font-semibold text-base font-[Poppins-Regular]">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
