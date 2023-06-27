import {View, Text, Switch, Pressable } from 'react-native';
import styles from './styles';
import { useSelector,useDispatch } from 'react-redux';
import { toggleAllowDelete } from '../../../redux/preferenceSlice';

export default function Preference() {
    const allowDelete = useSelector((state) => {
        return state.preference.allowDelete
    })
    const dispatch = useDispatch();
    const handleAllowDeleteChange = () => {
        dispatch(toggleAllowDelete());
    }

    return (
        <View style = {styles.container} >
            <Text style = {styles.title }> Preferences: </Text>

            <View style={styles.optionContainer} >
                <Switch 
                value={allowDelete}
                onValueChange={handleAllowDeleteChange}
                />
                <Pressable onPress={handleAllowDeleteChange}>
                    <Text style = {styles.optionText}>
                        Allow deleting items
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}