import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ColorsList } from '../../util/Colors';

type FlatButtonProps={
    onPress : ()=>void,
    label : string
}

function FlatButton({ label, onPress }:FlatButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: ColorsList.primary100
  },
});