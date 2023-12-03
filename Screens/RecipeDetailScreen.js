import { View, Text, ScrollView,Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon,UsersIcon } from 'react-native-heroicons/solid';
import React, { useEffect , useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import { Square3Stack3DIcon } from 'react-native-heroicons/outline';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated ,{ FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';




export default function RecipeDetailScreen(props) {
    console.log(props.route.params);
    let item=props.route.params;
    const [isFavorite,setIsFavorite]=useState(false);
    const navigation=useNavigation();
    const [meal,setMeal]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        getMealData(item.idMeal);
      },[])

    const getMealData=async (id)=>{
        try{
          const response=await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          //console.log(response.data);
          if (response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
          }
        }
        catch(err){
          console.log(err);
        }
      }
      const ingredientsIndexes=(meal)=>{
        if (!meal) return [];
        let indexes=[];
        for (let i=1;i<=20;i++){
            if (meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        return indexes;
      }
  return (
   <ScrollView className="bg-white flex-1"
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{paddingBottom:30}}>
        <StatusBar style={"light"} />
        <View className="flex-row justify-center">
            <Image source={{uri:item.strMealThumb}}
                   style={{width:wp(98),height:hp(50),borderRadius:53, borderBottomLeftRadius:40,borderBottomRightRadius:40,marginTop:4,borderTopLeftRadius:40,borderTopRightRadius:40}}
                   sharedTransitionTag={item.strMeal}
                   />

        </View>

    <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={()=>navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
            <ChevronLeftIcon size={hp(5)} strokeWidth={7} color="rgb(132 204 22)"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{setIsFavorite(!isFavorite)}} className="p-2 rounded-full mr-5 bg-white">
            <HeartIcon size={hp(5)} strokeWidth={7} color={isFavorite?"red":"gray"}/>
        </TouchableOpacity>
    </Animated.View>
    {
        loading?(
            <Loading size="large" className="mt-60" />
        ):(
            <View className="px-4 flex justify-between space-y-4 pt-8">
                <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                    <Text style={{fontSize:hp(3)}} className="font-bold flex-1 text-neutral-700">
                        {meal.strMeal}
                    </Text>
                    <Text style={{fontSize:hp(2)}} className="font-bold flex-1 text-neutral-500">
                        {meal.strArea}
                    </Text>
                </Animated.View>
                <Animated.View  entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
                    <View className="flex rounded-full bg-lime-500 p-2">
                        <View style={{height:hp(6.5),width:hp(6.5)}} 
                        className="bg-white rounded-full flex items-center justify-center">

                            <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>

                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                35
                            </Text>
                            <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                mins
                            </Text>
                        </View>

                    </View>

                    <View className="flex rounded-full bg-lime-500 p-2">
                        <View style={{height:hp(6.5),width:hp(6.5)}} 
                        className="bg-white rounded-full flex items-center justify-center">

                            <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>

                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                3
                            </Text>
                            <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                servings
                            </Text>
                        </View>

                    </View>

                    <View className="flex rounded-full bg-lime-500 p-2">
                        <View style={{height:hp(6.5),width:hp(6.5)}} 
                        className="bg-white rounded-full flex items-center justify-center">

                            <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>

                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                103
                            </Text>
                            <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                calories
                            </Text>
                        </View>

                    </View>
                    <View className="flex rounded-full bg-lime-500 p-2">
                        <View style={{height:hp(6.5),width:hp(6.5)}} 
                        className="bg-white rounded-full flex items-center justify-center">

                            <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>

                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                
                            </Text>
                            <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                easy
                            </Text>
                        </View>

                    </View>

                 

                </Animated.View>
                {/* ingredients */}

                <Animated.View  entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                        <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                            Ingredients
                        </Text>
                        <View className="space-y-2 ml-3"> 
                            {
                                ingredientsIndexes(meal).map((index)=>{
                                    return(
                                        <View key={index} className="flex-row space-x-4">
                                            <View style={{height:hp(1.5),width:hp(1.5)}} className="bg-lime-500 rounded-full">
                                            </View>
                                            <View className="flex-row space-x-2">
                                                <Text style={{fontSize:hp(1.7)}} className="font-extrabold text-neutral-700">
                                                    {meal['strMeasure'+index]}
                                                    </Text>
                                                    <Text style={{fontSize:hp(1.7)}} className="font-medium text-neutral-600">
                                                    {meal['strIngredient'+index]}
                                                    </Text>
                                            
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>

                </Animated.View>
                {/* instructions */}
                <Animated.View  entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                        <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                            Instructions

                        </Text>
                        <Text style={{fontSize:hp(1.6)}} className="text-neutral-700">
                            {
                                meal?.strInstructions
                            }
                        </Text>
                </Animated.View>
                    {/* video */}
                    {meal.strYoutube && (
                        <Animated.View  entering={FadeInDown.delay(400).duration(700).springify().damping(12)}>
                             <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                            Recipe video

                                </Text>
                                <View>
                                    <YoutubeIframe
                                    videoId={meal.strYoutube.split('=')[1]}
                                    height={hp(30)}
                                    />
                                </View>
                        </Animated.View>
                    )
                    }


            </View>
        )
    }
   </ScrollView>
  )
}