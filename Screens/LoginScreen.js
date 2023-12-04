import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useRef, useState ,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring , FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth } from '../Firebase/firebase';



export default function LoginScreen({navigation}) {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  //const navigation = useNavigation();
  const refInput2=useRef();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSignin = async () => {
    console.log("Handling signin..."); // Add this line
    console.log(email); // Add this line

    try {
    const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home",{email:email});
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  
  };


  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => (ring1padding.value = withSpring(ring1padding.value + hp(5))), 100);
    setTimeout(() => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))), 300);

    //setTimeout(()=>navigation.navigate('Login'),2500)
  }, []);
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
  
    <View className="flex-1 items-center pt-8 space-y-6 bg-lime-500"
    >
      <StatusBar style="light" />
      <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring2padding }}>
        <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring1padding }}>
          <Image source={require('../assets/food.png')} style={{ width: hp(20), height: hp(20) }} />
        </Animated.View>
      </Animated.View>
      <View  className="mx-4 flex-row items-center rounded-full bg-white/20 p-3">
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="white"
          keyboardType='email-address'
          onSubmitEditing={()=>{refInput2.current.focus();}}
          blurOnSubmit={false}
          onChangeText={(text)=>{setEmail(text)}}
          style={{ fontSize: hp(2), flex: 1 }}
        />
      </View>
      <View className="mx-4 flex-row items-center rounded-full bg-white/20 p-3">
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="white"
          secureTextEntry={true}
          ref={refInput2}
          onChangeText={(text)=>{setPassword(text)}}
          style={{ fontSize: hp(2), flex: 1 }}
        />
      </View > 
      <TouchableOpacity 
        onPress={handleSignin}
        className="mx-4 flex-row items-center rounded-full bg-black p-3"
        style={{ width: wp(90), alignItems: 'center', justifyContent: 'center' }}
        >
        <Text style={{ fontSize: hp(2), color: 'white', fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{width:"82%",alignItems:"flex-end"}}>
                <Text 
                style={{color:"white" , fontWeight:"bold"}}
                onPress={()=>{navigation.navigate('Signup')}}
                >
                  Create new user
                </Text>
        </TouchableOpacity>
    </View>

  );
}
