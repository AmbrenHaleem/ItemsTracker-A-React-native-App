import { useState } from 'react';
import { View, Text, TextInput, Keyboard,Pressable, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import * as database from '../../database/index';
import { primaryColor } from '../../includes/variable';
import { isMatch, parse } from 'date-fns';

export default function Form(props) {
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [savingDate, setSavingData] = useState(false);

  //console.log('Props:',props);
  const handleAddPress = async () => {
    try{
        const validate = [];

        // validate the data
        if (itemDescription === ''){
            validate.push('Item is required.');
        }
        if (itemQuantity === ''){
            validate.push('Quantity is required.');
        }
        if (itemCost === ''){
            validate.push('Cost is required.');
        }
        if (purchaseDate === ''){
            validate.push('Purchase Date is required.');
        }
        if (!isMatch(purchaseDate, 'dd/MM/yyyy')){
          validate.push('Purchase Date is not valid.');
        }
        if (expiryDate === ''){
            validate.push('Expiry Date is required.');
        }
        if (!isMatch(expiryDate, 'dd/MM/yyyy')){
          validate.push('Expiry Date is not valid.');
        }
        if (validate.length > 0) {
            setErrorMessages(validate);
        }
        else {
          const pDate =  parse(purchaseDate, 'dd/MM/yyyy', new Date());
          const eDate = parse(expiryDate, 'dd/MM/yyyy', new Date())
         // console.log('Date', date);
            const data = {
              itemDescription : itemDescription,
              itemQuantity : itemQuantity,
              itemCost : itemCost,
              purchaseDate : pDate,
              expiryDate : eDate,
            }
            //console.log("Add data : ", data);
            setSavingData(true);
            const id = await database.save(data);
            setSavingData(false);

            if (id){
                props.onAddItem(id, itemDescription, itemQuantity,itemCost,purchaseDate,expiryDate);
               
                setItemDescription('');
                setItemQuantity('');
                setItemCost('');
                setPurchaseDate('');
                setExpiryDate('');
                setErrorMessages([]);
                Keyboard.dismiss();
                props.navigation.goBack();
            }
        }
    }
    catch(err){
        console.error(err)
    }
}
   
  const handleDescriptionChange = (value) => {
    setItemDescription(value);
  }
  const handleQuantityChange = (value) => {
    setItemQuantity(value);
  }
  const handleCostChange = (value) => {
    setItemCost(value);
  }
  const handlePurchaseDateChange = (value) => {
    setPurchaseDate(value);
  }
  const handleExpiryDateChange = (value) => {
    setExpiryDate(value);
  }
  
  if (savingDate){
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size = 'large' color = {primaryColor}/>
            <Text style={styles.loadingText}> Saving data!</Text>
            <Text style={styles.loadingText}> Please, wait...</Text>
        </View>
    );
  }
  return (
    <ScrollView>
    <View style={styles.container}>

      {errorMessages.length > 0 && (
        <View style={styles.errorMessage.container}>
        <Text style={styles.errorMessage.label}> Invalid Data:</Text>
        {errorMessages.map((message,index) => (
             <Text key={index} style={styles.errorMessage.text}>
             - {message}
             </Text>
        )
        )}
        </View>
      )}
      
      <Text style={styles.label}>Description:</Text>
      <TextInput
        maxLength={150}
        onChangeText={handleDescriptionChange}
        defaultValue={itemDescription}
        style={styles.textbox}
      />

      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        keyboardType='numeric'
        maxLength={12}
        onChangeText={handleQuantityChange}
        defaultValue={itemQuantity}
        style={styles.textbox}
        placeholder='0'
      />
      
      <Text style={styles.label}>Cost:</Text>
      <TextInput
        keyboardType='numeric'
        maxLength={150}
        onChangeText={handleCostChange}
        defaultValue={itemCost}
        style={styles.textbox}
        placeholder='$0.00'
      />

      <Text style={styles.label}>Purchase On:</Text>
      <TextInput
        maxLength={150}
        onChangeText={handlePurchaseDateChange}
        defaultValue={purchaseDate}
        style={styles.textbox}
        placeholder='DD/MM/YYYY'
      />

      <Text style={styles.label}>Expiry:</Text>
      <TextInput
        maxLength={150}
        onChangeText={handleExpiryDateChange}
        defaultValue={expiryDate}
        style={styles.textbox}
        placeholder='DD/MM/YYYY'
      />

      {/* <Button style={styles.button}
        title='Add'
        onPress={handleAddPress} 
      /> */}
      <Pressable style={styles.button.container} onPress={handleAddPress} >
        <Text style={styles.button.text}>Add</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
}