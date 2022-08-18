import React,{useState} from 'react';
import {  Text, StyleSheet} from 'react-native';
 
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
 
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth:2,
    borderColor: '#7d53ea',
    // borderBottomWidth:2,
    color:'#7d53ea',
    textAlign:'center'

  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});
 
 
const App = () => {
  const [value, setValue] = useState('');
  return (
      <CodeField
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
  );
};
 

export default App