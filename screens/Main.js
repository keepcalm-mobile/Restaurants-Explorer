import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Text, Image, Button, Icon} from 'react-native-elements';
import axios from 'axios';
import Details from './Details';

const {height, width} = Dimensions.get('window');

const getIcon = (value, compare, order) => {
  if (value === compare && order === 'desc') {
    return <Icon name="arrow-drop-down" type="material" color="white" />;
  } else if (value === compare && order === 'asc') {
    return <Icon name="arrow-drop-up" type="material" color="white" />;
  }
};

export default function Main({data, onSort, sort, order, onLoadMore}) {
  const [isVisible, setVisible] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(false);

  const onBackButtonPress = () => {
    setVisible(false);
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onDetails(item.restaurant.id)}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#0074D9',
          borderWidth: 1,
          margin: 5,
          borderRadius: 15,
        }}>
        <Image
          style={{
            height: height * 0.11,
            width: height * 0.11,
            borderRadius: 50,
            margin: 5,
          }}
          source={
            item.restaurant.featured_image
              ? {uri: item.restaurant.featured_image}
              : {
                  uri:
                    'https://www.linguahouse.com/linguafiles/md5/d01dfa8621f83289155a3be0970fb0cb',
                }
          }
        />
        <View style={{margin: 5, flex: 1}}>
          <View>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              {item.restaurant.name}
            </Text>
          </View>
          <Text style={{fontSize: 20}}>
            Average Rating:{' '}
            <Text
              style={{
                color: `#${item.restaurant.user_rating.rating_color}`,
                fontWeight: 'bold',
              }}>
              {item.restaurant.user_rating.aggregate_rating}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onDetails = (id) => {
    setVisible(true);
    setLoading(true);
    getDetails(id);
  };

  const getDetails = async (id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`,
        headers: {
          'user-key': '538564238e665f01d63cc07132d09a03',
          Accept: 'application / json',
        },
      });
      setRestaurant(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottomColor: '#CAC5C4',
          borderBottomWidth: 1,
        }}>
        <Button
          icon={getIcon(sort, 'cost', order)}
          title="Cost"
          containerStyle={{width: width * 0.3, margin: 5}}
          buttonStyle={[
            styles.button,
            sort === 'cost' ? styles.order : styles.original,
          ]}
          onPress={() => onSort(sort, order, 'cost')}
        />
        <Button
          icon={getIcon(sort, 'rating', order)}
          title="Rating"
          containerStyle={{width: width * 0.3, margin: 5}}
          buttonStyle={[
            styles.button,
            sort === 'rating' ? styles.order : styles.original,
          ]}
          onPress={() => onSort(sort, order, 'rating')}
        />
        <Button
          icon={getIcon(sort, 'real_distance', order)}
          title="Distance"
          containerStyle={{width: width * 0.3, margin: 5}}
          buttonStyle={[
            styles.button,
            sort === 'real_distance' ? styles.order : styles.original,
          ]}
          onPress={() => onSort(sort, order, 'real_distance')}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.restaurant.id}
        ListFooterComponent={
          <Button
            raised
            title="Load More"
            containerStyle={{width: '40%', alignSelf: 'center', margin: 5}}
            buttonStyle={{borderRadius: 25}}
            onPress={onLoadMore}
          />
        }
      />
      <Details
        restaurant={restaurant}
        isVisible={isVisible}
        loading={loading}
        onBackButtonPress={onBackButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
  },
  order: {
    backgroundColor: '#47D939',
  },
  original: {
    backgroundColor: '#0074D9',
  },
});
