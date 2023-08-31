import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

interface ILocationDialogProps {
  isVisible: boolean;
}

const LocationDialog: React.FC<ILocationDialogProps> = ({ isVisible }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const slideAnim = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }
  }, [isVisible]);

  return (
    <Modal transparent visible={isVisible}>
      <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
       
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LocationDialog;