
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Greeting from '@/components/Home/Greeting';
import Search from '@/components/Home/Search';
import Card from '@/components/Home/Card';
import Category from '@/components/Home/Category';

const Dashboard = () => {
 
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4 space-y-4">
        {/* Greeting Card */}
        <Greeting />

        {/* Search Section */}
        <Search />

        {/* Categories */}
        <Category/>

       
        {/* Resort Cards */}
        <Card />


      </ScrollView>


    </SafeAreaView>
  );
}; 

export default Dashboard;
