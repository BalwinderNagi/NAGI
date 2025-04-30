import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';

// Define piano keys with their notes and positions
const PIANO_KEYS = [
  { note: 'C', isBlack: false, sound: 'c4.mp3' },
  { note: 'C#', isBlack: true, sound: 'c_sharp4.mp3' },
  { note: 'D', isBlack: false, sound: 'd4.mp3' },
  { note: 'D#', isBlack: true, sound: 'd_sharp4.mp3' },
  { note: 'E', isBlack: false, sound: 'e4.mp3' },
  { note: 'F', isBlack: false, sound: 'f4.mp3' },
  { note: 'F#', isBlack: true, sound: 'f_sharp4.mp3' },
  { note: 'G', isBlack: false, sound: 'g4.mp3' },
  { note: 'G#', isBlack: true, sound: 'g_sharp4.mp3' },
  { note: 'A', isBlack: false, sound: 'a4.mp3' },
  { note: 'A#', isBlack: true, sound: 'a_sharp4.mp3' },
  { note: 'B', isBlack: false, sound: 'b4.mp3' },
];

const PianoKeyboard = () => {
  const [pressedKey, setPressedKey] = useState(null);
  const [sound, setSound] = useState();

  const playSound = async (note) => {
    // In a real app, you would load the actual sound files
    // For this example, we're just simulating sound playback
    console.log(`Playing note: ${note}`);
    
    // This is just a placeholder for actual sound implementation
    // In a real app, you would use code like:
    // const { sound } = await Audio.Sound.createAsync(
    //   require(`../assets/sounds/${soundFile}`)
    // );
    // setSound(sound);
    // await sound.playAsync();
  };

  const handleKeyPress = (index, note) => {
    setPressedKey(index);
    playSound(note);
    
    // Reset pressed key after a short delay
    setTimeout(() => {
      setPressedKey(null);
    }, 300);
  };

  // Render white keys first as the base
  const renderWhiteKeys = () => {
    return PIANO_KEYS.filter(key => !key.isBlack).map((key, index) => (
      <TouchableOpacity
        key={`white-${index}`}
        style={[
          styles.whiteKey,
          pressedKey === `white-${index}` && styles.whiteKeyPressed
        ]}
        onPress={() => handleKeyPress(`white-${index}`, key.note)}
        activeOpacity={0.7}
      >
        <Text style={styles.keyLabel}>{key.note}</Text>
      </TouchableOpacity>
    ));
  };

  // Render black keys on top
  const renderBlackKeys = () => {
    let blackKeyIndex = 0;
    const blackKeyPositions = PIANO_KEYS.map((key, index) => key.isBlack ? index : null).filter(pos => pos !== null);
    
    return blackKeyPositions.map((position, index) => {
      // Calculate position based on previous white keys
      const whiteKeysBeforeThis = PIANO_KEYS.slice(0, position).filter(k => !k.isBlack).length;
      const leftPosition = whiteKeysBeforeThis * 50 - 10; // Adjust based on white key width
      
      return (
        <TouchableOpacity
          key={`black-${index}`}
          style={[
            styles.blackKey,
            { left: leftPosition },
            pressedKey === `black-${index}` && styles.blackKeyPressed
          ]}
          onPress={() => handleKeyPress(`black-${index}`, PIANO_KEYS[position].note)}
          activeOpacity={0.7}
        >
          <Text style={styles.blackKeyLabel}>{PIANO_KEYS[position].note}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.keyboard}>
        <View style={styles.whiteKeysContainer}>
          {renderWhiteKeys()}
        </View>
        <View style={styles.blackKeysContainer}>
          {renderBlackKeys()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  keyboard: {
    height: 180,
    position: 'relative',
    flexDirection: 'row',
  },
  whiteKeysContainer: {
    flexDirection: 'row',
    height: 180,
  },
  blackKeysContainer: {
    position: 'absolute',
    width: '100%',
    height: 180,
    flexDirection: 'row',
  },
  whiteKey: {
    width: 50,
    height: 180,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  whiteKeyPressed: {
    backgroundColor: '#e6e6e6',
  },
  blackKey: {
    position: 'absolute',
    width: 30,
    height: 100,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    zIndex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  blackKeyPressed: {
    backgroundColor: '#333',
  },
  keyLabel: {
    color: '#333',
    fontSize: 12,
  },
  blackKeyLabel: {
    color: 'white',
    fontSize: 10,
  },
});

export default PianoKeyboard;