import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default function Loading() {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator
        style={{alignSelf: 'center'}}
        size="large"
        color="#0074D9"
      />
    </View>
  );
}
