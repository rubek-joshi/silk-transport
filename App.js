import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image
} from 'react-native';
import axios from 'axios';
import {Card, CardItem, H1, H3, Body} from 'native-base';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    //axios.defaults.baseURL = 'http://transport.jhattai.com:3001/api'
    this.state = {
      loads: []
    }
  }
  componentDidMount(){
    axios.get('http://transport.jhattai.com:3001/api/loads?filter=%7B%22limit%22%3A5%7D', {
      // params: {
      //   filter: '%7B%22limit%22%3A5%7D'
      // },
    })
    .then((response) => {
      // console.log(response);
      this.setState({loads: response.data});
    })
    .catch(err => console.log(err));
  }
  _renderItem = ({item}) => {
    return (
      <Card style={{paddingBottom: 16}}>
        <CardItem header bordered>
          <Body>
            <H1>{item.markaNumber}</H1>
            <Text note>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
          </Body>
        </CardItem>
        <CardItem>
        <H3>{item.loadName}</H3>
        </CardItem>
        <CardItem cardBody style={{paddingHorizontal: 24}}>
          {item.products.map((value, index) => {
            return (
              <View key={index}>
                <Text style={styles.itemDetails}>{'\u2022'} <Text style={{fontWeight: 'bold'}}>Item Name:</Text> {value.itemName}</Text>
                <Text style={styles.itemDetails}>{'\u2022'} <Text style={{fontWeight: 'bold'}}>Quantity:</Text> {value.qty}</Text>
                <Text style={styles.itemDetails}>{'\u2022'} <Text style={{fontWeight: 'bold'}}>Price:</Text> {value.price}</Text>
              </View>
            );
          })}
        </CardItem>

      </Card>
    );
  }
  render(){
    return (
      <FlatList
        data={this.state.loads}
        renderItem={this._renderItem}
        style={{padding: 16, marginBottom: 16}}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemDetails: {
    paddingVertical: 8
  }
});

export default App;
