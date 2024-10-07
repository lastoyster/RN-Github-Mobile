import { Animated } from "react-native";
import React, { FC, useEffect, useRef } from "react";

const SlideInView: FC = ({ children }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, []);
    return (
        <Animated.View
            style={{
                opacity: translateY.interpolate({
                    inputRange: [0, 0.5],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                }),
                transform: [
                    {
                        translateY: translateY.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 0],
                            extrapolate: "clamp",
                        }),
                    },
                ],
                flex: 1,
            }}
        >
            {children}
        </Animated.View>
    );
};

export default SlideInView;
