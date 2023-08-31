import { StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";

import tw from "@/lib/tailwind";
import { useSupabase } from "@/context/useSupabase";
import { ImageSlider } from "@/components/ui/ImageSlider";
import Page from "@/components/ui/Page";
import { useNotification } from "@/hooks/useNotification";
import { useEffect } from "react";
import { useGlobalState } from "@/hooks/store";
import { isEmpty } from "@/lib/utils";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
  const { signOut } = useSupabase();
  const { registerNotification } = useNotification();
  const state = useGlobalState();
  useEffect(() => {
    if (isEmpty(state.notificationToken())) {
      registerNotification().then((token) => {
        if (!isEmpty(token) && typeof token == "string") {
          state.setNotificationToken(token);
        }
      }).catch((err) => {
        console.log("err", err);
        });
    } else {
      console.log("dsdd", state.notificationToken());
    }
  }, []);

  return (
    <Page>
      <View>
        <View>
          <ImageSlider
            autoScroll={false}
            autoSlideInterval={5000}
            data={[
              "https://placehold.co/1024x1024/black/white",
              "https://placehold.co/1024x1024/black/red",
              "https://placehold.co/1024x1024/black/red",
            ]}
          />
        </View>
        <Text style={tw`text-2xl font-bold`}>Car Cleaningjjbu</Text>
        {/* <LocationDialog isVisible={true}/> */}
      </View>
    </Page>
  );
}
