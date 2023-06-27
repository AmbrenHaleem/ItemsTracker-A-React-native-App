import { StyleSheet } from 'react-native';
import { primaryColor } from '../../includes/variable';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: primaryColor,
    borderBottomWidth: 3,
    paddingBottom: 5,
    paddingTop: 30,
    paddingHorizontal: 10
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: primaryColor,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginLeft: 10
  },
  author: {
    fontSize: 14,
    color: '#777',
  }
});

export default styles;