import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Text, Image, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('window');

export default function Details({
  isVisible,
  restaurant,
  loading,
  onBackButtonPress,
}) {
  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={500}
      animationOutTiming={500}
      hideModalContentWhileAnimating
      isVisible={isVisible}
      style={{margin: 0}}
      onBackButtonPress={onBackButtonPress}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator
              size="large"
              color="#0074D9"
              style={{justifyContent: 'center'}}
            />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View
              style={{
                borderBottomColor: '#CAC5C4',
                borderBottomWidth: 2,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Details
              </Text>
            </View>
            <Icon
              name="keyboard-backspace"
              type="material"
              color="#0074D9"
              size={45}
              containerStyle={{
                position: 'absolute',
                marginLeft: 2,
              }}
              onPress={onBackButtonPress}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{paddingLeft: 5, paddingRight: 5}}>
              <Text
                style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>
                {restaurant.name}
              </Text>
              <Image
                source={
                  restaurant.featured_image
                    ? {uri: restaurant.featured_image}
                    : {
                        uri:
                          'https://www.linguahouse.com/linguafiles/md5/d01dfa8621f83289155a3be0970fb0cb',
                      }
                }
                style={{
                  width: '100%',
                  height: height * 0.25,
                  borderRadius: 5,
                }}
              />
              {restaurant.location && restaurant.location.address ? (
                <Text style={styles.text}>
                  <Text style={styles.bold}>Address:</Text>{' '}
                  {restaurant.location.address}
                </Text>
              ) : (
                <Text style={styles.text}>Unknown Location</Text>
              )}
              <Text style={styles.text}>
                <Text style={styles.bold}>Average Price For Two:</Text>{' '}
                {restaurant.average_cost_for_two} {restaurant.currency}
              </Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                Highlights:
              </Text>
              {restaurant.highlights &&
                restaurant.highlights.map((value, key) => (
                  <View key={key} style={{flexDirection: 'row'}}>
                    <Icon name="done" type="material" color="green" size={35} />
                    <Text style={styles.text}> {value}</Text>
                  </View>
                ))}
              <Text style={styles.text}>
                <Text style={styles.bold}>Cuisines:</Text> {restaurant.cuisines}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Rating:</Text>{' '}
                <Text
                  style={{
                    color: `#${
                      restaurant.user_rating &&
                      restaurant.user_rating.rating_color
                    }`,
                  }}>
                  {restaurant.user_rating &&
                    restaurant.user_rating.aggregate_rating}
                  {'  '}
                  {restaurant.user_rating && restaurant.user_rating.rating_text}
                </Text>{' '}
                ({restaurant.user_rating && restaurant.user_rating.votes} votes)
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Phone Number(s):</Text>
                {'\n'}
                {restaurant.phone_numbers}
              </Text>
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
  },
  bold: {
    fontWeight: 'bold',
  },
});
