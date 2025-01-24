import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';

export default function Category() {

    const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Services',
    'Packages',
    'Feedbacks',
  ];


  return (
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 16 }}
  >
    <View className="flex-row items-center space-x-4">
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => setSelectedCategory(category)}
          className={`h-9 items-center justify-center px-5 me-2 rounded-full ${selectedCategory === category
            ? 'bg-[#c35ddf]'
            : 'bg-gray-100'
            }`}
        >
          <Text style={{fontFamily: 'Poppins-Regular'}}
            className={`text-sm ${selectedCategory === category
              ? 'text-white'
              : 'text-gray-600'
              }`}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
  )
}