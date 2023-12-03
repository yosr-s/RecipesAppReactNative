import { View, Text, ScrollView ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import {categoryData} from '../constants/index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated ,{ FadeInDown, FadeOut } from 'react-native-reanimated';



export default function Categories({categories,activeCategory,handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal:15}}>
            {categories.map((cat,index)=>{
              let isActive=activeCategory===cat.strCategory;
              let activeButtonClass=isActive?' bg-lime-500':' bg-black/10';
                return(
                    <TouchableOpacity key={index}
                     style={{ alignItems: 'center', marginHorizontal: 4 }}
                     onPress={()=>handleChangeCategory(cat.strCategory)}>
                    <View 
                    className={"rounded-full p-[6px] "+activeButtonClass}>
                      <Image
                        source={{ uri: cat.strCategoryThumb}}
                        style={{ width: hp(6), height: hp(6), borderRadius: hp(3) }}
                      />
                    </View>
                    <Text style={{ fontSize: hp(1.6), marginTop: 4, color: 'black' }}>{cat.strCategory}</Text>
                  </TouchableOpacity>
                    
                )
            })}
    
        </ScrollView>


    </Animated.View>
  )
}