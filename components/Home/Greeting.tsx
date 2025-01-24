import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Greeting() {
  return (
    <View className="bg-[#D28AE6] rounded-xl p-4 shadow-lg">
    <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white text-2xl font-bold mb-1">
      Good Morning, 
    </Text>
    <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white text-lg mb-4">
      Rica Jane</Text>
  

    <View className="mb-4">
      <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white text-sm">Say goodbye to laundry day stress—</Text>
      <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white text-sm">LaundryBest delivers spotless results with</Text>
      <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white text-sm">convenience you can count on!</Text>
    </View>

    <TouchableOpacity
      className="bg-[#c35ddf] self-end px-4 py-2 rounded-lg"
      onPress={() => {
        console.log('View Details pressed');
      }}
    >
      <Text style={{fontFamily: 'Poppins-Regular'}} className="text-white font-light tracking-wider">Know more</Text>
    </TouchableOpacity>
  </View>
  )
}