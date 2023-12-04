import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useRef, useState ,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring , FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth } from '../Firebase/firebase';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon,UsersIcon } from 'react-native-heroicons/solid';


export default function SignupScreen({navigation}) {
    const refInput2=useRef();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState(""); 
    const [confirmPassword, setConfirmPassword] = useState("");
    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const handleSignup = async () => {
        console.log("Handling signup...");
        console.log(email);
      
        if (password !== confirmPassword) {
          alert("Password and confirm password do not match");
          return;
        }
      
        try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          navigation.navigate("Home", { email: email });
        } catch (e) {
          console.log(e);
          alert(e.message);
        }
      };
      const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

      useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(() => (ring1padding.value = withSpring(ring1padding.value + hp(4))), 100);
        setTimeout(() => (ring2padding.value = withSpring(ring2padding.value + hp(4.5))), 300);
    
        //setTimeout(()=>navigation.navigate('Login'),2500)
      }, []);

      
  return (
    <KeyboardAvoidingView className="flex-1 items-center pt-8 space-y-6 bg-lime-500"
    behavior={behavior}
    >
      <StatusBar style="light" />
      <TouchableOpacity onPress={()=>navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
            <ChevronLeftIcon size={hp(3)} strokeWidth={7} color="rgb(132 204 22)"/>
        </TouchableOpacity>

      <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring2padding }}>
        <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring1padding }}>
          <Image source={require('../assets/breakfast.png')} style={{ width: hp(10), height: hp(10) }} />
        </Animated.View>
      </Animated.View>
      <View  className="mx-4 flex-row items-center rounded-full bg-white/20 p-3">
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="white"
          value={email}
          onSubmitEditing={()=>{refInput2.current.focus();}}
          blurOnSubmit={false}
          onChangeText={(text)=>{setEmail(text)}}
          style={{ fontSize: hp(2), flex: 1 }}
        />
      </View>
      <View className="mx-4 flex-row items-center rounded-full bg-white/20 p-3">
        <TextInput
          placeholder="Enter a password"
          placeholderTextColor="white"
          secureTextEntry={true}
          value={password}
          keyboardType='default'
          ref={refInput2}
          onChangeText={(text)=>{setPassword(text)}}
          style={{ fontSize: hp(2), flex: 1 }}
        />
      </View > 
      <View className="mx-4 flex-row items-center rounded-full bg-white/20 p-3">
        <TextInput
          placeholder='confirm password'
          placeholderTextColor="white"
          secureTextEntry={true}
          value={confirmPassword}
          keyboardType='default'
          ref={refInput2}
          onChangeText={(text)=>{setConfirmPassword(text)}}
          style={{ fontSize: hp(2), flex: 1 }}
        />
      </View > 
      <TouchableOpacity 
        onPress={handleSignup}
        className="mx-4 flex-row items-center rounded-full bg-black p-3"
        style={{ width: wp(90), alignItems: 'center', justifyContent: 'center' }}
        >
        <Text style={{ fontSize: hp(2), color: 'white', fontWeight: 'bold' }}>Sign Up</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}