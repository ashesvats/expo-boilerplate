import { Pressable, Text, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from "@/lib/tailwind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Drawer from "./Drawer";

function AppBar(){
    const [open,setOpen]=useState(false)
    return (<SafeAreaView>
        <View style={[tw` flex flex-row justify-between px-3 border-accent border-b py-2`]}>
        <Pressable onPress={()=>{
            setOpen(!open)
        }}>
            <Ionicons name="menu" size={28}/>
        </Pressable>
        <Pressable>
            <View style={tw`flex flex-row items-center`}>
                <Ionicons name="location" size={16}/>
                <Text style={tw`text-md`}>Katihar</Text>
            </View>
        </Pressable>
       
    </View>
    <Drawer anchor="left" isOpen={open}>
            <Text>kjewbndfk</Text>
        </Drawer>
    </SafeAreaView>)
}

export default AppBar