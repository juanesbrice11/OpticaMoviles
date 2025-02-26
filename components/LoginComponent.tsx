import { useRouter } from "expo-router";
import { LoginSchema, loginSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";

export default function LoginComponent() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchema) => {
        console.log(data);
        router.push("/home");
    };

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
        >
            <ImageBackground
                source={require("@/assets/images/background.png")}
                className="flex-1"
                resizeMode="cover"
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 justify-center items-center px-5 pt-48">
                        <TextInput
                            className="w-11/12 h-12 rounded-2xl border border-gray-400 bg-gray-300 shadow-lg px-4 text-black"
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={watch("email")}
                            onChangeText={(text) => setValue("email", text)}
                            {...register("email")}
                            placeholderTextColor="#5F5F5F"
                        />
                        <Text className="w-11/12 text-xs text-gray-500 text-left mt-2 mb-2">
                            {errors.email?.message}
                        </Text>

                        <TextInput
                            className="w-11/12 h-12 rounded-2xl border border-gray-400 bg-gray-300 shadow-lg px-4 text-black"
                            placeholder="Password"
                            secureTextEntry
                            value={watch("password")}
                            onChangeText={(text) => setValue("password", text)}
                            {...register("password")}
                            placeholderTextColor="#5F5F5F"
                        />
                        <Text className="w-11/12 text-xs text-gray-500 text-left mt-2 mb-2">
                            {errors.password?.message}
                        </Text>


                        <Text className="text-base font-normal text-gray-500 self-end mr-10 mb-5">
                            Forgot password?
                        </Text>

                        <Pressable
                            className="w-11/12 bg-primary py-3 rounded-2xl items-center mt-2"
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text className="text-lg font-bold text-gray-300">Sign in</Text>
                        </Pressable>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}
