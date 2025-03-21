import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView, Button } from 'react-native';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { baseinput, cancelbutton, acceptbutton } from './tokens';

export interface FormField<TSchema> {
  name: string;
  type: keyof TSchema;
  placeholder: string;
  label: string;
  secureTextEntry?: boolean;
}

import { FieldValues, Path } from 'react-hook-form';

interface FormComponentProps<TSchema extends FieldValues> {
  schema: z.ZodType<TSchema>;
  fields: FormField<TSchema>[];
  buttonAccept: string;
  buttonCancel: string;
  onSubmit: (data: TSchema) => void;
  onCancel?: () => void;
}

export const FormComponent = <TSchema extends FieldValues>({
  schema,
  fields,
  buttonAccept,
  buttonCancel,
  onSubmit,
  onCancel,
}: FormComponentProps<TSchema>) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="items-center justify-center w-full">
            {fields.map((field) => (
              <View className="w-11/12 mb-4" key={field.name}>
                <Text className="text-gray-700 mb-1">{field.label}</Text>
                <TextInput
                  className={baseinput}
                  placeholder={field.placeholder}
                  secureTextEntry={field.secureTextEntry}
                  value={String(watch(field.type as Path<TSchema>) ?? '')}
                  onChangeText={(text) =>
                    setValue(field.type as Path<TSchema>, text as any)
                  }
                  {...register(field.type as Path<TSchema>)}
                />
                {errors[field.type] && (
                  <Text className="text-red-500">
                    {String(errors[field.type]?.message)}
                  </Text>
                )}
              </View>
            ))}

            <View className="flex-row w-11/12 mt-4 justify-end gap-2">
              <Pressable
                className={cancelbutton}
                onPress={() => (onCancel ? onCancel() : null)}
              >
                <Text className="text-white font-bold">{buttonCancel}</Text>
              </Pressable>

              <Pressable
                className={acceptbutton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="text-white font-bold">{buttonAccept}</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
