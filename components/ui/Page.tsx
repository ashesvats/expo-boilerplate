import tw from "@/lib/tailwind";
import React, { ReactElement } from "react";
import { View } from "react-native";

const Page = ({ children }:{children:ReactElement}) => {
    return <View style={tw`flex flex-col  bg-red-600`}>
        {children}
    </View>
    }
    export default Page;