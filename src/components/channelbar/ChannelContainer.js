import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

export default class ChannelContainer extends Component {
  render() {
    return (
      <>
        <View style={styles.main}>
          <Text style={styles.mainText}>Channel Container</Text>
          <Image
            style={styles.images}
            source={{
              uri:
                'https://neverthink.tv/assets/images/61d1aeee19fd7cff13a8b17727f1b5a4e9645f16c42ff376a5e5f3ce8a373df2.png',
            }}
          />
          <FlatList
            horizontal={true}
            data={[
              {
                url:
                  'https://neverthink.tv/assets/images/61d1aeee19fd7cff13a8b17727f1b5a4e9645f16c42ff376a5e5f3ce8a373df2.png',
                id: 1,
              },
              {
                url:
                  'https://neverthink.tv/assets/images/61d1aeee19fd7cff13a8b17727f1b5a4e9645f16c42ff376a5e5f3ce8a373df2.png',
                id: 2,
              },
              {
                url:
                  'https://neverthink.tv/assets/images/61d1aeee19fd7cff13a8b17727f1b5a4e9645f16c42ff376a5e5f3ce8a373df2.png',
                id: 3,
              },
            ]}
            renderItem={({item}) => (
              <View>
                <Image style={styles.images} source={{uri: item.url}} />

                <Text>Hello</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 30,
    color: 'blue',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  images: {
    height: 50,
    width: 50,
  },
});
