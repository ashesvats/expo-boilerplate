import { useDeviceContext } from "twrnc";
import { Drawer } from "expo-router/drawer";
import tw from "@/lib/tailwind";
import { SupabaseProvider } from "@/context/SupabaseProvider";
import { Linking, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerContentScrollView, DrawerHeaderProps, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useSupabase } from "@/context/useSupabase";


function CustomDrawerContent(props:any) {
  const supabase = useSupabase();
  return (
    <DrawerContentScrollView {...props}>
     <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          supabase.signOut()
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function Root() {
  useDeviceContext(tw);
  const insets = useSafeAreaInsets();
  const CustomHeader = ({ navigation, route, options }: DrawerHeaderProps) => {
    return (
     <View style={{
      paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
     }}>
       <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Ionicons size={28} name="menu" />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <Ionicons size={16} name="location" color={"red"} />
            <Text style={tw`font-bold`}>Katiddhar</Text>
          </View>
        </Pressable>
      </View>
     </View>
    );
  };
  return (
    <Drawer
    drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        header: (props) => <CustomHeader {...props} />,
        headerStyle: {
          backgroundColor: "white",
        },
      }}
    ></Drawer>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
