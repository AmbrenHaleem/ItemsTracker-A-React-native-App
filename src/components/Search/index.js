import { useState } from "react";
import { TextInput,View } from "react-native";
import styles from "./styles";

export default function Search(props) {

    const [searchText,setSearchText] = useState('');

    console.log('Search Props : ', props )
    const handleSearchTextChange = (value) => {
        setSearchText(value);
        props.onItemSearch(value);
    }
    return(
    <View style={styles.container}>
        <TextInput 
        maxLength={150}
        onChangeText={newText => handleSearchTextChange(newText)}
        defaultValue={searchText}
        style={styles.textBox}
        placeholder="Search"
      />
    </View>
    )
}