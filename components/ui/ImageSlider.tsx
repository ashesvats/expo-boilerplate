import * as React from 'react';
import { FlatList, View, Animated,Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
export interface ISlideProps {
  data: string[];
  autoSlideInterval?: number;
  autoScroll?: boolean;
}

export const ImageSlider = ({ data, autoSlideInterval = 2000,autoScroll }: ISlideProps) => {
  const scrollX = new Animated.Value(0);
  const [index, setIndex] = React.useState(0);
  let flatListRef: any;

  const slides = data.map((image, i) => {
    return { id: i.toString(), image };
  });

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoScroll) {
      timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
      }, autoSlideInterval);
    }

    return () => timer && clearInterval(timer);
  }, [data.length, autoSlideInterval, autoScroll]);


  React.useEffect(() => {
    if (flatListRef) {
      flatListRef.scrollToIndex({ animated: true, index });
    }
  }, [index,autoScroll]);

  return (
    <View>

      <FlatList
        ref={(ref) => (flatListRef = ref)}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
          listener: (event) => {},
        })}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height: 200 }}>
             <Image
			style={styles.image}
			source={{
        uri:item.image,
        
      }}/>
            </View>
          );
        }}
      />
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          return <Animated.View key={i.toString()} style={{ height: 10, width: dotWidth, borderRadius: 5, backgroundColor: '#333', margin: 5 }} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	image: {
	  width: "100%",
	  height:200,
	},
  });