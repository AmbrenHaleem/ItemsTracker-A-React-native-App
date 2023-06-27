import {View, ScrollView} from 'react-native';
import Item from './Item';
import styles from './styles';
import Search from '../Search';

export default function ItemList(props) {
 // console.log('Items Props', props)
    return (
        <View style={styles.container}>
        <Search onItemSearch={props.onItemSearch} />
        <ScrollView>
       
          {props.items.map(
            (item, index) => (
              <Item key={index} item={item} onItemRemoval={props.onItemRemoval} />
            )
          )}
        </ScrollView>
      </View>
    )
}