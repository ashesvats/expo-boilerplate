import { hookstate, useHookstate, State } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Location = {
    lat: number | undefined;
    long: number | undefined;
    pincode: string | undefined;
    address: string | undefined;
};

type Notification = {
    title: string;
    body: string;
    data: object;
    isRead: boolean;
    date: Date;
};

type GlobalState = {
    isAuthenticated: boolean;
    setAuthentication: (authentication: boolean) => void;
    location: Location;
    setLocation: (location: Location) => void;
    isLocation: boolean;
    showLocation: boolean;
    showLogin: boolean;
    notificationToken: string | undefined;
    setNotificationToken: (token: string) => void;
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
};

const globalState = hookstate<GlobalState>({
    isAuthenticated: false,
    setAuthentication: (authentication: boolean) => {},
    location: {
        lat: undefined,
        long: undefined,
        pincode: undefined,
        address: undefined,
    },
    setLocation: (location: Location) => {},
    isLocation: false,
    showLocation: false,
    showLogin: false,
    notificationToken: undefined,
    setNotificationToken: (token: string) => {},
    notifications: [],
    addNotification: (notification: Notification) => {},
});

const wrapState = (s: State<GlobalState>) => ({
    isAuthenticated: () => s.isAuthenticated.value,
    setAuthentication: (authenticated: boolean) => {
        s.merge({
            isAuthenticated: authenticated,
        });
    },
    location: s.location,
    setLocation: (location: Location) => {
        if (location) {
            s.merge({
                location: location,
                isLocation: true,
            });
            AsyncStorage.setItem("location",JSON.stringify(location))
        }
    },
    isLocation: () => s.isLocation.value,
    showLocation: () => s.showLocation.value,
    showLogin: () => s.showLogin.value,
    notificationToken: () => s.notificationToken.value,
    setNotificationToken: (token: string) => {
        s.merge({
            notificationToken: token,
        });
        AsyncStorage.setItem("notificationToken",token)
    },
    notifications: s.notifications.value,
    addNotification: (notification: Notification) => {
        s.notifications.merge([notification, ...s.notifications.value]);
    },
    setShowLocation: (show: boolean) => {
        s.merge({
            showLocation: show,
        });
    },
    setShowLogin: (show: boolean) => {
        s.merge({
            showLogin: show,
        });
    },
});

export const accessGlobalState = () => wrapState(globalState);
export const useGlobalState = () => wrapState(useHookstate(globalState));
