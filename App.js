import React, {useEffect, useState} from 'react';
import {View, Dimensions, StatusBar} from 'react-native';
import {Text} from 'react-native-elements';
import axios from 'axios';
import Loading from './screens/Loading';
import Main from './screens/Main';

const {height, width} = Dimensions.get('window');

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('rating');
  const [order, setOrder] = useState('desc');
  const [offset, setOffset] = useState(0);

  const onLoadMore = () => {
    getRestaurants(sort, order, offset + 20);
    setOffset(offset + 20);
  };

  const onSort = (sort, order, value) => {
    if (sort === value) {
      if (order === 'desc') {
        getRestaurants(value, 'asc', 0);
        setOffset(0);
        setOrder('asc');
      } else {
        getRestaurants(value, 'desc', 0);
        setOffset(0);
        setOrder('desc');
      }
    } else {
      getRestaurants(value, 'desc', 0);
      setSort(value);
      setOffset(0);
      setOrder('desc');
    }
  };

  const getRestaurants = async (sort, order, offset) => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&start=${offset}&lat=24.031111&lon=49.842957&sort=${sort}&order=${order}`,
        headers: {
          'user-key': '538564238e665f01d63cc07132d09a03',
          Accept: 'application / json',
        },
      });
      if (response.data && response.data.restaurants.length) {
        setData(response.data.restaurants);
      } else {
        alert('API Limit Reached');
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRestaurants(sort, order, 0);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#0074D9" />
      <View
        style={{
          height: height * 0.09,
          backgroundColor: '#0074D9',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}>
          Restaurants Explorer
        </Text>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <Main
          data={data}
          onSort={onSort}
          sort={sort}
          order={order}
          onLoadMore={onLoadMore}
        />
      )}
    </View>
  );
}
