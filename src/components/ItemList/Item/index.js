import { useState } from 'react';
import { View, Text, Pressable, Modal, Switch, Alert } from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as database from '../../../database/index';
import { useSelector } from 'react-redux';
import {  format } from 'date-fns';

export default function Item(props) {
  const [showModal, setShowModal] = useState(false);
//console.log('Items : ',props.item)
  const allowDelete = useSelector(
    (state) => state.preference.allowDelete
  )
  const handleModalToggle = () => {
    setShowModal(!showModal);
  }
 //console.log('Props in Item', props);
  const handleRemovePress = () => {
    Alert.alert(
      'Remove Item',
      'This action will permanently delete this item. This action cannot be undone!', [
      {
        text: 'Confirm',
        onPress: async () => {
          //console.log('Removal Id', props.item.id);
          props.onItemRemoval(props.item.id);
          const deleted = await database.remove(props.item.id);
          if(!deleted){
            Alert.alert('Error','There was an error trying to delete item.');
          }
          else{
            setShowModal(false);
          }
        }
      },
      {
        text: 'Cancel'
      }
    ]);
  }

  return (
    <>
      <Pressable onPress={handleModalToggle}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.item.itemDescription}</Text>
          { props.item.expiryDate.seconds ?
            <Text style={styles.text}>Expiry: {format(new Date(props.item.expiryDate.seconds * 1000),'dd/MM/yyyy')}</Text>
            :
            <Text style={styles.text}>Expiry: { props.item.expiryDate }</Text>
          }
          </View>
      </Pressable>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modal.container}>
          <View style={styles.modal.box}>

            {/* Close Modal */}
            <Pressable onPress={handleModalToggle}>
              <View style={styles.close.container}>
                <AntDesign name="closesquare" size={25} color="#c00" />
                <Text style={styles.close.text}>Close</Text>
              </View>
            </Pressable>

            {/* Item Description */}
            <Text style={styles.title}>{props.item.itemDescription}</Text>
            <Text style={styles.text}>Quantity: {props.item.itemQuantity}</Text>
            <Text style={styles.text}>Cost: {props.item.itemCost}$</Text>
              { props.item.purchaseDate.seconds ? 
                <Text style={styles.text}>Date of Purchase: {format(new Date(props.item.purchaseDate.seconds * 1000),'dd/MM/yyyy')}</Text> 
              :
              <Text style={styles.text}>Date of Purchase: {props.item.purchaseDate}</Text> 
              }
              
            {/* Item Expiry */}
            { props.item.expiryDate.seconds ?
               <Text style={styles.text}>Expiry: {format(new Date(props.item.expiryDate.seconds * 1000),'dd/MM/yyyy')}</Text>
              :
              <Text style={styles.text}>Expiry: {props.item.expiryDate}</Text>
            }

              {/* Remove Button */}
              {allowDelete && (
                <View style={styles.remove.container}>
                  <Pressable onPress={handleRemovePress}>
                    <MaterialIcons name='delete-sweep' size={32} style={styles.remove.icon} />
                    <Text style={styles.remove.label}>Remove</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        
      </Modal>
    </>
  );
}