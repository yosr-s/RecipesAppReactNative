import { View, Text, ScrollView, Image, TextInput, TouchableOpacity,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { MagnifyingGlassIcon, SparklesIcon } from 'react-native-heroicons/solid';
import { BellIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import { useRoute } from '@react-navigation/native'; // Import useRoute
import { db } from '../Firebase/firebase';
import { ref, get, query, orderByKey } from 'firebase/database';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavorisScreen({ navigation }) {
  const route = useRoute(); // Use useRoute to access the route object
  console.log('saluuut', route.params);
  const email = route.params;
  console.log('salut encore une fois', email);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedRecipes();
  }, []);

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
    <View>
      <StatusBar style="dark" />
      <Text>FavorisScreen</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={likedRecipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View>
              {/* Render your FlatList item here using item */}
              <Image source={{ uri: item.strMealThumb }} style={{ width: 100, height: 100 }} />
              <Text>{item.strMeal}</Text>
              {/* Add other components to display additional details if needed */}
            </View>
          )}
        />
      )}
    </View>
  );
}
