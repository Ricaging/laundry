import { View, TextInput} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Search() {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mt-2 mb-4">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput style={{fontFamily: 'Poppins-Regular'}}
            placeholder="Enter tracking number..."
            className="flex-1 ml-2 text-gray-800"
            placeholderTextColor="gray"
          />
        </View>
  )
}