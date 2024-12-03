import { StyleSheet } from 'react-native';
import colors from '../../../color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  content: {
    marginLeft: 10,
    borderStartColor: '#F6C700',
    borderStartWidth: 10,
    borderStartEndRadius: 5,
    borderStartStartRadius: 5,
    marginBottom: 10,
    padding: 2,
    paddingLeft: 15,
  },
  overview: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 230,
    marginBottom: 16,
    borderRadius: 10,
  },
  details: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  boton: {
    backgroundColor: '#F6C700',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  TextBoton: {
    fontFamily: 'roboto',
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;