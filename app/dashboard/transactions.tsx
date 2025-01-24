import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const Transactions = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const transactions = [
        {
            id: '1',
            date: '2023-05-01',
            serviceType: 'Wash & Fold',
            number: 'LND000001',
            amount: 20,
            status: 'Completed',
            deliveryStatus: 'Delivered',
        },
        {
            id: '2',
            date: '2023-05-02',
            serviceType: 'Dry Cleaning',
            number: 'LND000002',
            amount: 50,
            status: 'Pending',
            deliveryStatus: 'Ready for Pickup',
        },
        {
            id: '3',
            date: '2023-05-03',
            serviceType: 'Ironing Service',
            number: 'LND000003',
            amount: 20,
            status: 'Completed',
            deliveryStatus: 'Picked Up',
        },
    ];
    

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                <View className="p-6">
                    {/* Header Section */}
                    <View className="mb-8">
                        <View className="flex-row items-center justify-between mb-6">
                            <View className="flex-1">
                                <Text style={{ fontFamily: 'Poppins-Regular', color: '#8327b2' }} className="text-4xl font-bold">Transactions</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-500 mt-2">View and manage your bookings and reservations</Text>
                            </View>
                            <View className="bg-blue-100 p-4 rounded-2xl">
                                <Ionicons name="receipt" size={32} color="#8327b2" />
                            </View>
                        </View>
                    </View>

                    {/* Filters */}
                    <View className="flex-row space-x-4 mb-6">
                        {/* Date Filter */}
                        <View className="flex-1">
                            <TouchableOpacity className="flex-row items-center bg-white rounded-xl border border-gray-200 p-3">
                                <Ionicons name="calendar" size={20} color="#8327b2" />
                                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-600 ml-2">
                                    {selectedDate || 'Filter by date'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Type Filter */}
                        <View className="flex-1">
                            <TouchableOpacity className="flex-row items-center bg-white rounded-xl border border-gray-200 p-3">
                                <Ionicons name="filter" size={20} color="#8327b2" />
                                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-600 ml-2">
                                    {selectedType === 'all' ? 'All Types' : selectedType}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                 {/* Laundry Transactions List */}
                    <View className="space-y-4 mt-2">
                        {transactions.map((transaction) => (
                            <View key={transaction.id} className="bg-white rounded-xl p-4 border border-gray-100 mt-2">
                                <View className="flex-row items-center justify-between mb-3">
                                    <View className="flex-row items-center">
                                        <View className="bg-blue-100 p-2 rounded-full mr-3">
                                            <Ionicons
                                                name="shirt-outline" // Icon related to laundry
                                                size={20}
                                                color="#8327b2"
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-800 font-medium">
                                                {transaction.serviceType} {/* E.g., Wash & Fold, Dry Cleaning */}
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-500 text-sm">
                                                {transaction.date}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-blue-600 font-bold">
                                        <Text style={{ color: '#8327b2' }}>₱</Text>
                                        <Text style={{ color: '#2E4053' }}>{transaction.amount}</Text>
                                    </Text>
                                </View>

                                <View className="border-t border-gray-100 pt-3">
                                    <View className="flex-row items-center justify-between">
                                        <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-600">
                                            {transaction.number} {/* Transaction ID */}
                                        </Text>
                                        <View className="flex-row items-center space-x-3">
                                            {/* Status Indicator */}
                                            <View className={`px-3 py-1 rounded-full ${transaction.status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                                <Text className={`text-sm ${transaction.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                    {transaction.status}
                                                </Text>
                                            </View>

                                            {/* Delivery Status */}
                                            {transaction.deliveryStatus && (
                                                <View className="px-3 py-1 bg-blue-100 rounded-full">
                                                    <Text className="text-blue-600 text-sm">{transaction.deliveryStatus}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Pagination */}
                    <View className="flex-row items-center justify-between mt-6">
                        <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-500">
                            Showing 1 to 4 of 4 entries
                        </Text>
                        <View className="flex-row space-x-2">
                            <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                                <Text className="text-gray-600">Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#8327b2' }} className="px-4 py-2 rounded-lg">
                                <Text className="text-white">Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Transactions;
