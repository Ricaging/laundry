import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Card() {


  const resorts = [
    { name: 'Drop and Go', image: require('../../assets/images/drop and go.jpg'), description: 'Quick and hassle-free laundry service for your busy schedule.', price: '₱50.00', tags: ['Fast Service', 'Convenient', 'No Waiting'] },
    { name: 'Hand Wash', image: require('../../assets/images/hand wash.webp'), description: 'Gentle care for your delicate fabrics and special garments.', price: '₱20.00', tags: ['Delicate', 'Thorough', 'Fabric Care'] },
    { name: 'Iron Stream', image: require('../../assets/images/ironing.jpg'), description: 'Crisp and wrinkle-free clothes for a polished look.', price: '₱25.00', tags: ['Professional Finish', 'Steam Care', 'Sharp Look'] },
    { name: 'Fold', image: require('../../assets/images/fold.jpg'), description: 'Neat and organized folding service for your freshly cleaned laundry.', price: '₱50.00', tags: ['Organized', 'Neat', 'Time-Saving'] },
    { name: 'Pick-Up', image: require('../../assets/images/pick-up.jpg'), description: 'We’ll pick up your laundry right from your doorstep.', price: '₱50.00', tags: ['Doorstep Service', 'Convenient', 'Time-Saving'] },
    { name: 'Delivery', image: require('../../assets/images/del.jpg'), description: 'Freshly cleaned laundry delivered straight to your home.', price: '₱50.00', tags: ['Convenient', 'On-Time', 'Reliable'] },
  ];
  return (
    <View className="flex-row flex-wrap justify-between mt-6">
      {resorts.map((resort) => (
        <View
          key={resort.name}
          className="w-[48%] bg-white rounded-2xl mb-4 overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2, // for Android
          }}
        >
          <Image source={resort.image} className="w-full h-40" />
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-1">
              <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-800 text-lg font-semibold">{resort.name}</Text>
              
            </View>

            <Text className="text-gray-500 text-sm mb-3">{resort.description}</Text>


            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-[#c35ddf] text-xl font-bold">{resort.price}</Text>
              <View className="bg-[#f9eefe] px-3 py-1 rounded-full">
                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-[#D28AE6] text-sm">Available</Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-[#c35ddf] w-full py-3 rounded-xl"
              onPress={() => console.log('View pressed')}
            >
              <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-white text-center font-semibold">View</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

