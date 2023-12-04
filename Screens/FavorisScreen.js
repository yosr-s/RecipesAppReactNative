import { View, Text, ScrollView, Image, TextInput, TouchableOpacity,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated ,{ FadeInDown, FadeOut,FadeIn,FadeInRight } from 'react-native-reanimated';
import { MagnifyingGlassIcon, SparklesIcon,ChevronLeftIcon } from 'react-native-heroicons/solid';
import { BellIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import { useRoute } from '@react-navigation/native'; // Import useRoute
import { db } from '../Firebase/firebase';
import { ref, get, query, orderByKey } from 'firebase/database';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/loading';


export default function FavorisScreen({ navigation }) {
  const route = useRoute(); // Use useRoute to access the route object
  console.log('saluuut', route.params);
  const email = route.params;
  console.log('salut encore une fois', email);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedRecipes();
  }, [likedRecipes]);

  const fetchLikedRecipes = async () => {
    try {
      const codmail = email.replace('.', '');
      const likedRecipesKey = `liked/${codmail}/`;

      // Get the Firebase database reference
      const likedRecipesRef = ref(db, 'liked');
      const userLikedRecipesQuery = query(likedRecipesRef, orderByKey());

      // Get the data for the user's liked recipes
      const userLikedRecipesSnapshot = await get(userLikedRecipesQuery);
      const userLikedRecipesData = userLikedRecipesSnapshot.val();
      console.log('userLikedRecipesData', userLikedRecipesData[codmail]);

      // Extract the user's liked recipes as an array
      const userLikedRecipesArray = Object.entries(userLikedRecipesData[codmail] || {}).map(([userId, recipes]) => {
        console.log('recipes', recipes.item);
        return recipes.item;
      });

      // Update the state with liked recipes
      setLikedRecipes(userLikedRecipesArray);
      console.log('Liked Recipes:', userLikedRecipesArray);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
  
      {/* Header with navigation buttons, avatar, and search input */}
      <View className="mx-4 flex-row justify-between item-center mb-2 pt-20">
        <TouchableOpacity onPress={()=>navigation.goBack()} className="rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(4)} strokeWidth={7} color="rgb(132 204 22)"/>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={()=>{navigation.navigate("Favoris",email)}}>
          <Image source={require('../assets/avatar.png')} style={{width:hp(5),height:hp(5)}}/>
        </TouchableOpacity>
  
        <BellIcon size={hp(5)} color="gray"/>
      </View>
  
      <View className="mx-4 space-y-2 mb-2">
        <Text style={{fontSize:hp(1.7)}} className="text-neutral-800">{email}</Text>
        <View>
          <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Check your favorite</Text>
        </View>
        <Text className="font-semibold text-neutral-600" style={{fontSize:hp(3.8)}}>
          <Text className="text-lime-500">MEALS</Text>
        </Text>
      </View>
  
      <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
        <TextInput
          placeholder="Search in your favorites!"
          placeholderTextColor="gray"
          style={{ fontSize: hp(2), paddingBottom: hp(1) }}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
        />
        <TouchableOpacity style={{ padding: hp(1) }}>
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.7)} color="gray" strokeWidth={3} />
          </View>
        </TouchableOpacity>
      </View>
  
      {/* ScrollView properties applied to the View wrapping FlatList */}
      <View
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
      >
        {loading ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <Animated.FlatList
            entering={FadeInDown.delay(200).duration(900).springify().damping(20)}
            data={likedRecipes}
            keyExtractor={(item) => item.idMeal}
            style={{paddingRight:wp(2),paddingLeft:wp(17)}}
            renderItem={({ item }) => (
              <View>
                {/* Render your FlatList item here using item */}
                <TouchableOpacity onPress={()=>navigation.navigate('RecipeDetail',{...item})}>
                  <Image source={{ uri: item.strMealThumb }} style={{ width: 250, height: 150, borderRadius:20,paddingBottom:hp(10) }} />
                </TouchableOpacity>
                <Text className="font-semibold text-neutral-600" >{item.strMeal}</Text>
                {/* Add other components to display additional details if needed */}
              </View>
            )}
          />
        )}
      </View>
  
    </View>
  );
  
  
}
