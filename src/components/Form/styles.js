import { StyleSheet } from 'react-native';
import { primaryColor } from '../../includes/variable';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 20
  },
  label: {
    color: '#777',
    fontSize: 16
  },
  textbox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bcbcbc',
    paddingVertical: 7,
    paddingHorizontal: 14,
    fontSize: 16
  },
  switch: {
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 20
    },
    label: {
      color: '#777',
      fontSize: 16,
      marginRight: 10
    }
  },
  button: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: primaryColor,
      marginTop : 20
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  },
  errorMessage: {
    container: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 30,
      borderColor: '#c00',
      borderWidth: 1,
      borderLeftWidth: 8
    },
    label: {
      color: '#c00',
      fontSize: 14,
      fontWeight: 'bold'
    },
    text: {
      color: '#c00',
      fontSize: 16
    }
  },
  loadingContainer: {
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#444',
    fontSize : 21,
    marginTop: 10
  }
});

export default styles;