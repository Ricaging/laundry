import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Platform, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import * as Clipboard from 'expo-clipboard'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Reserve = () => {
    const generateReservationNumber = () => {
        const timestamp = Date.now()
        return `RS${timestamp}`
    }

    const [formData, setFormData] = useState({
        reservation_number: generateReservationNumber(),
        facility_id: '',
        user_id: '',
        check_in: new Date(),
        check_out: new Date(),
        adult_count: 1,
        kid_count: 0,
        stay_duration: '',
        payment_method: '',
        payment_proof: null as any,
        special_request: '',
        total_amount: 0,
        additional_services: [] as string[],
    })

    const facilities = [
        {
            id: '1',
            name: 'Drop and Go',
            image: require('../../assets/images/drop and go.jpg'),
            maxLoad: '8', 
            serviceDetails: ['Quick Wash','Speed Service'], 
            price: 50
        },
        {
            id: '2',
            name: 'Hand Wash',
            image: require('../../assets/images/hand wash.webp'),
            maxLoad: '8', 
            serviceDetails: ['Stain Removal', 'Fabric Softener'], 
            price: 20
        },
        {
            id: '3',
            name: 'Iron Stream',
            image: require('../../assets/images/ironing.jpg'),
            maxLoad: '8', 
            serviceDetails: ['Steam Ironing', 'Wrinkle Removal'], 
            price: 50
        },
        {
            id: '4',
            name: 'Fold',
            image: require('../../assets/images/fold.jpg'),
            maxLoad: '8',
            serviceDetails: ['Neat Folding', 'Clothes Sorting'], 
            price: 50
          },
          {
            id: '5',
            name: 'Pick-Up Service',
            image: require('../../assets/images/pick-up.jpg'),
            serviceDetails: ['Home Pickup', 'Scheduled Time'], 
            price: 50
          },
          {
            id: '6',
            name: 'Delivery Service',
            image: require('../../assets/images/del.jpg'),
            serviceDetails: ['Door Delivery', 'Real-Time Tracking'], 
            price: 50
          }
    ]

    useEffect(() => {
        // Generate new booking number when component mounts
        setFormData(prev => ({
            ...prev,
            reservation_number: generateReservationNumber()
        }))
    }, [])

    const [showCheckIn, setShowCheckIn] = useState(false)
    const [showCheckOut, setShowCheckOut] = useState(false)
    const [showPaymentPicker, setShowPaymentPicker] = useState(false)
    const [showDurationPicker, setShowDurationPicker] = useState(false)
    const [datePickerMode, setDatePickerMode] = useState<'date' | 'time'>('date')
    const [activeDate, setActiveDate] = useState<'check_in' | 'check_out'>('check_in')

    const paymentMethods = [
        { label: 'Cash', value: 'cash' },
        { label: 'Gcash', value: 'gcash' }

    ]

    const stayDurations = [
        { label: 'Pick-Up', value: 'pickup' },
        { label: 'Deliver', value: 'deliver' }
    ]

    const formatDateTime = (date: Date) => {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }

    const handleDateTimeChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            if (event.type === 'dismissed') {
                setShowCheckIn(false)
                setShowCheckOut(false)
                return
            }
        }

        if (selectedDate) {
            const currentDate = new Date(selectedDate)

            if (activeDate === 'check_in') {
                if (datePickerMode === 'date') {
                    // Keep the existing time when changing date
                    const newDate = new Date(formData.check_in)
                    newDate.setFullYear(currentDate.getFullYear())
                    newDate.setMonth(currentDate.getMonth())
                    newDate.setDate(currentDate.getDate())
                    setFormData({ ...formData, check_in: newDate })
                    if (Platform.OS === 'ios') {
                        setDatePickerMode('time')
                    } else {
                        setShowCheckIn(false)
                        setTimeout(() => {
                            setDatePickerMode('time')
                            setShowCheckIn(true)
                        }, 100)
                    }
                } else {
                    // Keep the existing date when changing time
                    const newDate = new Date(formData.check_in)
                    newDate.setHours(currentDate.getHours())
                    newDate.setMinutes(currentDate.getMinutes())
                    setFormData({ ...formData, check_in: newDate })
                    setShowCheckIn(false)
                    setDatePickerMode('date')
                }
            } else {
                if (datePickerMode === 'date') {
                    const newDate = new Date(formData.check_out)
                    newDate.setFullYear(currentDate.getFullYear())
                    newDate.setMonth(currentDate.getMonth())
                    newDate.setDate(currentDate.getDate())
                    setFormData({ ...formData, check_out: newDate })
                    if (Platform.OS === 'ios') {
                        setDatePickerMode('time')
                    } else {
                        setShowCheckOut(false)
                        setTimeout(() => {
                            setDatePickerMode('time')
                            setShowCheckOut(true)
                        }, 100)
                    }
                } else {
                    const newDate = new Date(formData.check_out)
                    newDate.setHours(currentDate.getHours())
                    newDate.setMinutes(currentDate.getMinutes())
                    setFormData({ ...formData, check_out: newDate })
                    setShowCheckOut(false)
                    setDatePickerMode('date')
                }
            }
        }
    }

    const openDatePicker = (type: 'check_in' | 'check_out') => {
        setActiveDate(type)
        setDatePickerMode('date')
        if (type === 'check_in') {
            setShowCheckIn(true)
        } else {
            setShowCheckOut(true)
        }
    }

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        })

        if (!result.canceled) {
            setFormData({ ...formData, payment_proof: result.assets[0].uri })
        }
    }

    // Calculate form completion progress
    const calculateProgress = () => {
        let totalFields = 7; // Total number of required fields
        let completedFields = 0;

        if (formData.facility_id) completedFields++;
        if (formData.check_in) completedFields++;
        if (formData.check_out) completedFields++;
        if (formData.adult_count > 0) completedFields++;
        if (formData.payment_method) completedFields++;
        if (formData.reservation_number) completedFields++;
        if (formData.payment_proof) completedFields++;

        return (completedFields / totalFields) * 100;
    };

    const additionalServices = [
        { id: 1, name: 'Ironing', price: 20.00, icon: 'shirt-outline' },
        { id: 2, name: 'Fabric Softener', price: 30.00, icon: 'water-outline' },
        { id: 3, name: 'Express Service', price: 50.00, icon: 'timer-outline' },
        { id: 4, name: 'Stain Removal', price: 15.00, icon: 'color-filter-outline' },
        { id: 5, name: 'Folding Service', price: 20.00, icon: 'duplicate-outline' },
    ];
    

    const toggleService = (serviceId: string, price: number) => {
        setFormData(prev => {
            const services = prev.additional_services.includes(serviceId)
                ? prev.additional_services.filter(id => id !== serviceId)
                : [...prev.additional_services, serviceId];

            // Calculate new total amount
            const baseAmount = prev.total_amount;
            const serviceAmount = prev.additional_services.includes(serviceId)
                ? -price  // Remove price if service was selected
                : price;  // Add price if service wasn't selected

            return {
                ...prev,
                additional_services: services,
                total_amount: baseAmount + serviceAmount
            };
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
          <ScrollView className="flex-1">
            <View className="p-6">
              {/* Header Section */}
              <View className="mb-8">
                <View className="flex-row items-center justify-between mb-6">
                  <View className="flex-1">
                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-4xl font-bold text-[#8327b2]">Schedule Service</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-500 mt-2">Fill out the form below to book your hassle-free laundry service!</Text>
                  </View>
                  <View className="bg-purple-100 p-4 rounded-2xl">
                    <Ionicons name="calendar-sharp" size={32} color="#8327b2" />
                  </View>
                </View>
              </View>
    
            {/* Progress Steps */}
    <View className="relative flex-row items-center mb-8">
      {/* Long Line Under Icons */}
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '6%', // Adjust left margin
          right: '6%', // Adjust right margin
          height: 2,
          backgroundColor: '#cccccc', // Default gray line
          zIndex: 0, // Ensures it stays below the icons
        }}
      />
    
      {/* Individual Steps */}
      {['Service', 'Checkout', 'Payment', 'Complete'].map((step, index) => (
        <View key={step} style={{ flex: 1, alignItems: 'center' }}>
          {/* Icon Container */}
          <View
            className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
            style={{
              backgroundColor: index === 0 ? '#8327b2' : '#cccccc', // Active or inactive color
              zIndex: 1, // Ensures it overlays the line
            }}
          >
            <Ionicons
              name={
                index === 0
                  ? 'list'
                  : index === 1
                  ? 'cart-outline'
                  : index === 2
                  ? 'card-outline'
                  : 'checkmark-circle-outline'
              }
              size={24}
              color={index === 0 ? '#ffffff' : '#9CA3AF'}
            />
          </View>
    
          {/* Step Label */}
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: index === 0 ? '#8327b2' : '#9CA3AF', // Active or inactive text color
              fontWeight: index === 0 ? '600' : 'normal',
            }}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
    
             {/* Laundry Selection Header */}
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <Ionicons name="shirt" size={24} color="#8327b2" />
        <Text className="text-xl font-semibold text-gray-800 ml-2">Select Your Laundry Option</Text>
      </View>
      <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-500">
        Choose from our premium laundry services tailored to your needs
      </Text>
    </View>

                    {/* Service Selection */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                        {facilities.map((facility) => (
                            <TouchableOpacity
                                key={facility.id}
                                onPress={() => {
                                    setFormData({
                                        ...formData,
                                        facility_id: facility.id,
                                        total_amount: facility.price
                                    })
                                }}
                                className={`mr-4 w-72 rounded-2xl overflow-hidden shadow-sm ${formData.facility_id === facility.id ? 'border-2 border-[#8327b2]' : 'border border-gray-100'
                                    }`}
                            >
                                <Image
                                    source={facility.image}
                                    className="w-full h-48"
                                    resizeMode="cover"
                                />
                                <View className="p-4 bg-white">
                                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-xl font-semibold text-gray-800">{facility.name}</Text>
                                    <View className="flex-row items-center mt-3">
                                        <Ionicons name="basket" size={20} color="#8327b2" />
                                        <Text className="text-gray-600 ml-2">Max {facility.maxLoad} kg</Text>
                                    </View>
                                    <View className="flex-row flex-wrap mt-3">
                                        {facility.serviceDetails.map((detail, index) => (
                                            <View key={index} className="bg-[#8327b2]/10 rounded-full px-3 py-1.5 mr-2 mb-2">
                                                <Text className="text-[#8327b2] text-sm font-medium">{detail}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-[#8327b2] font-bold mt-3 text-xl">₱{facility.price.toLocaleString()}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                     
                    {/* Form Fields */}
                    <View className="space-y-6">
                        {/* Booking Number */}
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Transaction Number</Text>
                            <View className="flex-row items-center bg-white rounded-xl border border-gray-200">
                                <View className="pl-4 pr-2">
                                    <Ionicons name="bookmark" size={20} color="#8327b2" />
                                </View>
                                <TextInput style={{ fontFamily: 'Poppins-Regular' }}
                                    className="flex-1 p-3 text-gray-800"
                                    value={formData.reservation_number}
                                    editable={false}
                                    
                                />
                            </View>
                        </View>

                        {/* Drop-off Date & Time */}
                                <View>
                                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Drop-off</Text>
                                    <TouchableOpacity
                                        onPress={() => openDatePicker('check_in')}
                                        className="flex-row items-center bg-white rounded-xl border border-gray-200 p-3"
                                    >
                                        <Ionicons name="calendar" size={20} color="#8327b2" className="mr-2" />
                                        <Text className="text-gray-800 ml-2">{formatDateTime(formData.check_in)}</Text>
                                    </TouchableOpacity>
                                    {showCheckIn && (
                                        <DateTimePicker
                                            value={formData.check_in}
                                            mode={datePickerMode}
                                            is24Hour={true}
                                            onChange={handleDateTimeChange}
                                            themeVariant="light"
                                            textColor="#8327b2"
                                            accentColor="#8327b2"
                                        />
                                    )}
                                </View>

                        {/* Pick-up Date & Time */}
                            <View>
                                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Pick-up</Text>
                                <TouchableOpacity
                                    onPress={() => openDatePicker('check_out')}
                                    className="flex-row items-center bg-white rounded-xl border border-gray-200 p-3"
                                >
                                    <Ionicons name="calendar" size={20} color="#8327b2" className="mr-2" />
                                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-800 ml-2">{formatDateTime(formData.check_out)}</Text>
                                </TouchableOpacity>
                                {showCheckOut && (
                                    <DateTimePicker
                                        value={formData.check_out}
                                        mode={datePickerMode}
                                        is24Hour={true}
                                        onChange={handleDateTimeChange}
                                        themeVariant="light"
                                        textColor="#8327b2"
                                        accentColor="#8327b2"
                                    />
                                )}
                            </View>

   {/* Laundry Load Count */}
<View className="flex-row space-x-4">
    <View className="flex-1">
        <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Laundry Load (kg)</Text>
        <View className="flex-row items-center bg-white rounded-xl border border-gray-200">
            <View className="pl-4 pr-2">
                <Ionicons name="basket" size={20} color="#8327b2" />
            </View>
            <TextInput 
                style={{ fontFamily: 'Poppins-Regular' }}
                className="flex-1 p-3 text-gray-800"
                value={formData.laundry_load?.toString() || ''}
                onChangeText={(text) => {
                    const load = parseInt(text) || 0;
                    setFormData({ ...formData, laundry_load: load <= formData.max_load ? load : formData.max_load });
                }}
                keyboardType="numeric"
                placeholder={`Max ${formData.max_load} kg`}
            />
        </View>
    </View>
</View>

                        {/* Select Pick-up or Deliver */}
<View>
    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Select Pick-up or Deliver</Text>
    <TouchableOpacity
        onPress={() => setShowDurationPicker(true)}
        className="flex-row items-center bg-white rounded-xl border border-gray-200 p-3"
    >
        <Ionicons name="swap-horizontal" size={20} color="#8327b2" className="mr-2" />
        <Text className="text-gray-800 ml-2">
            {stayDurations.find(option => option.value === formData.pick_deliver_option)?.label || 'Select Option'}
        </Text>
    </TouchableOpacity>
</View>

<Modal
    visible={showDurationPicker}
    transparent={true}
    animationType="slide"
>
    <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-xl p-4">
            {stayDurations.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    className="py-3 border-b border-gray-200"
                    onPress={() => {
                        setFormData({ ...formData, pick_deliver_option: option.value })
                        setShowDurationPicker(false)
                    }}
                >
                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-center text-[#8327b2]">{option.label}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                className="py-3 mt-2"
                onPress={() => setShowDurationPicker(false)}
            >
                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-center text-red-500">Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

                        {/* Additional Services */}
                        <View className="mt-2 mb-6">
                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mt-2 mb-4">Additional Services</Text>
                            <View className="space-y-3">
                                {additionalServices.map((service) => (
                                    <TouchableOpacity
                                        key={service.id}
                                        onPress={() => toggleService(service.id, service.price)}
                                        className={`flex-row items-center justify-between p-4 rounded-xl border mb-4 ${formData.additional_services.includes(service.id)
                                            ? 'border-[#8327b2] bg-[#8327b2]/10'
                                            : 'border-gray-200 bg-white'
                                            }`}
                                    >
                                        <View className="flex-row items-center flex-1">
                                            <View className={`w-10 h-10 rounded-full items-center justify-center ${formData.additional_services.includes(service.id)
                                                ? 'bg-[#8327b2]/20'
                                                : 'bg-gray-100'
                                                }`}>
                                                <Ionicons
                                                    name={service.icon as any}
                                                    size={20}
                                                    color={formData.additional_services.includes(service.id) ? '#8327b2' : '#6B7280'}
                                                />
                                            </View>
                                            <View className="ml-3 flex-1">
                                                <Text style={{ fontFamily: 'Poppins-Regular' }}
                                                    className={`font-medium ${formData.additional_services.includes(service.id)
                                                        ? 'text-[#8327b2]'
                                                        : 'text-gray-800'
                                                        }`}>
                                                    {service.name}
                                                </Text>
                                                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-500">
                                                    ₱{service.price.toFixed(2)}
                                                </Text>
                                            </View>
                                            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${formData.additional_services.includes(service.id)
                                                ? 'border-[#8327b2] bg-[#8327b2]'
                                                : 'border-gray-300'
                                                }`}>
                                                {formData.additional_services.includes(service.id) && (
                                                    <Ionicons name="checkmark" size={14} color="#ffffff" />
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Payment Method */}
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Payment Method</Text>
                            <TouchableOpacity
                                onPress={() => setShowPaymentPicker(true)}
                                className="flex-row items-center bg-white rounded-xl border border-gray-200 p-3"
                            >
                                <Ionicons name="card" size={20} color="#8327b2" className="mr-2" />
                                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-gray-800 ml-2">
                                    {paymentMethods.find(method => method.value === formData.payment_method)?.label || 'Select Payment Method'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Modal
                            visible={showPaymentPicker}
                            transparent={true}
                            animationType="slide"
                        >
                            <View className="flex-1 justify-end bg-black/50">
                                <View className="bg-white rounded-t-xl p-4">
                                    {paymentMethods.map((method) => (
                                        <TouchableOpacity
                                            key={method.value}
                                            className="py-3 border-b border-gray-200"
                                            onPress={() => {
                                                setFormData({ ...formData, payment_method: method.value })
                                                setShowPaymentPicker(false)
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-center text-[#8327b2]">{method.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    <TouchableOpacity
                                        className="py-3 mt-2"
                                        onPress={() => setShowPaymentPicker(false)}
                                    >
                                        <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-center text-red-500">Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {formData.payment_method === 'gcash' && (
                            <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                <View className="bg-[#8327b2]/10 p-6">
                                    <View className="items-center mb-6">
                                        <Image
                                            source={require('../../assets/images/logo-gcash.png')}
                                            className="w-40 h-20"
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View className="bg-white rounded-xl p-4 space-y-4">
                                        <View>
                                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-sm font-medium text-gray-500">GCash Number</Text>
                                            <View className="flex-row items-center justify-between mt-2">
                                                <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-[#8327b2] font-bold text-xl">09177239593</Text>
                                                <TouchableOpacity
                                                    className="bg-[#8327b2]/20 px-4 py-2 rounded-full"
                                                    onPress={async () => {
                                                        await Clipboard.setStringAsync('09177239593')
                                                        Alert.alert('Copied!', 'GCash number has been copied to clipboard')
                                                    }}
                                                >
                                                    <Text className="text-[#8327b2] font-medium">Copy</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-sm font-medium text-gray-500">Account Name</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-[#8327b2] font-bold text-xl mt-1">Edna B. Aurea</Text>
                                        </View>
                                    </View>

                                    <View className="mt-6">
                                        <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-lg font-semibold text-gray-800 mb-4">Payment Instructions</Text>
                                        <View className="space-y-3">
                                            {[
                                                "Open your GCash app and tap 'Send Money'",
                                                "Enter the GCash number: 09177239593",
                                                "Verify that the recipient is Edna B. Aurea",
                                                "Enter the exact amount and send payment",
                                                "Take a screenshot of your payment confirmation"
                                            ].map((instruction, index) => (
                                                <View key={index} className="flex-row space-x-3">
                                                    <View className="w-6 h-6 rounded-full bg-[#8327b2]/20 items-center justify-center">
                                                        <Text className="text-[#8327b2] font-medium">{index + 1}</Text>
                                                    </View>
                                                    <Text className="text-gray-600 flex-1">{instruction}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>

                                <View className="p-6 border-t border-gray-100">
                                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-3">Upload Payment Proof</Text>
                                    <TouchableOpacity
                                        onPress={handleImagePick}
                                        className="bg-[#8327b2]/10 rounded-xl p-6 items-center justify-center border-2 border-dashed border-[#8327b2]/20"
                                    >
                                        <Ionicons name="cloud-upload" size={32} color="#8327b2" />
                                        <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-[#8327b2] font-medium mt-2">Select Image</Text>
                                    </TouchableOpacity>
                                    {formData.payment_proof && (
                                        <View className="mt-4">
                                            <Image
                                                source={{ uri: formData.payment_proof }}
                                                className="w-full h-48 rounded-xl"
                                                resizeMode="cover"
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}

                        {/* Special Request */}
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Special Request</Text>
                            <View className="flex-row items-start bg-white rounded-xl border border-gray-200">
                                <View className="pt-3 pl-4 pr-2">
                                    <Ionicons name="create" size={20} color="#8327b2" />
                                </View>
                                <TextInput
                                    className="flex-1 p-3 text-gray-800"
                                    value={formData.special_request}
                                    onChangeText={(text) => setFormData({ ...formData, special_request: text })}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    placeholder="Any special requests?"
                                />
                            </View>
                        </View>

                        {/* Total Amount */}
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base font-medium text-gray-700 mb-2">Total Amount</Text>
                            <View className="flex-row items-center bg-white rounded-xl border border-gray-200">
                                <View className="pl-4 pr-2">
                                    <Ionicons name="cash" size={20} color="#8327b2" />
                                </View>
                                <TextInput
                                    className="flex-1 p-3 text-gray-800"
                                    value={`₱${formData.total_amount.toLocaleString()}`}
                                    editable={false}
                                />
                            </View>
                        </View>



                        {/* Submit Button */}
                        <TouchableOpacity
                            className="bg-[#8327b2] rounded-xl py-4 mt-8"
                            onPress={() => {
                                // Handle form submission
                                console.log(formData)
                            }}
                        >
                            <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-white text-center font-semibold text-lg">Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Reserve
