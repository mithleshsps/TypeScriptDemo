import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveDate = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('----SaveDate--ERROR-->', e);
  }
};
export const GetData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    return null;
  }
};
