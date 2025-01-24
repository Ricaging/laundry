import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

import "../global.css"


// ... existing imports ...

const RootLayout = () => {
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),

    });

    // ... rest of the code ...



    return (

        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="dashboard" />
        </Stack>

    )
}

export default RootLayout

const styles = StyleSheet.create({})