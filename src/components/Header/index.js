import { View, Text, Platform } from "react-native";
import { appName, primaryColor } from "../../includes/variable";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';

export default function Header(){

    const tagLine = Platform.OS === 'ios'
    ? 'for iOS'
     : 'for Android'

    return (
        <View style={styles.container}>
        <View style={styles.leftGroup}>
          <AntDesign name="carryout" size={24} color={primaryColor} />
          <Text style={styles.title}>{appName}</Text>
        </View>
        <Text style={styles.tagName}>{tagLine}</Text>
      </View>
    );
}