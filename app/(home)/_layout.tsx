import React from "react";
import { Stack } from "expo-router";
import TabNavigator from "@/components/Tabs";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="[id]" />
            <TabNavigator />
        </Stack>
    );
}