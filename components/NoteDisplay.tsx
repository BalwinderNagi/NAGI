import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Sample music notes to practice
const PRACTICE_NOTES = [
  { note: 'C', position: 'middle' },
  { note: 'D', position: 'middle' },
  { note: 'E', position: 'middle' },
  { note: 'F', position: 'middle' },
  { note: 'G', position: 'middle' },
  { note: 'A', position: 'middle' },
  { note: 'B', position: 'middle' },
];

const NoteDisplay = () => {
  const [currentNote, setCurrentNote] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceMode, setPracticeMode] = useState('random'); // 'random' or 'sequential'

  // Generate a new note to practice
  const generateNote = () => {
    let newNote;
    
    if (practiceMode === 'random') {
      // Get a random note from the practice set
      const randomIndex = Math.floor(Math.random() * PRACTICE_NOTES.length);
      newNote = PRACTICE_NOTES[randomIndex];
    } else {
      // Get the next note in sequence
      const currentIndex = currentNote 
        ? PRACTICE_NOTES.findIndex(n => n.note === currentNote.note) 
        : -1;
      const nextIndex = (currentIndex + 1) % PRACTICE_NOTES.length;
      newNote = PRACTICE_NOTES[nextIndex];
    }
    
    setCurrentNote(newNote);
    setShowAnswer(false);
  };

  // Initialize with a note on component mount
  useEffect(() => {
    generateNote();
  }, []);

  // Toggle practice mode between random and sequential
  const togglePracticeMode = () => {
    setPracticeMode(prevMode => prevMode === 'random' ? 'sequential' : 'random');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Note Practice</Text>
        <TouchableOpacity
          style={styles.modeButton}
          onPress={togglePracticeMode}
        >
          <Text style={styles.modeButtonText}>
            Mode: {practiceMode === 'random' ? 'Random' : 'Sequential'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.staffContainer}>
        {/* This is a simplified representation of a music staff */}
        <View style={styles.staff}>
          <View style={styles.staffLine}></View>
          <View style={styles.staffLine}></View>
          <View style={styles.staffLine}></View>
          <View style={styles.staffLine}></View>
          <View style={styles.staffLine}></View>
          
          {currentNote && (
            <View style={[
              styles.noteCircle,
              // The positioning would depend on the actual note in a real app
              // This is just a placeholder for demonstration
              {top: 40} 
            ]}>
              {showAnswer && (
                <Text style={styles.noteText}>{currentNote.note}</Text>
              )}
            </View>
          )}
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setShowAnswer(true)}
        >
          <Text style={styles.controlButtonText}>Show Note</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={generateNote}
        >
          <Text style={styles.controlButtonText}>Next Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modeButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  modeButtonText: {
    fontSize: 14,
    color: '#555',
  },
  staffContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  staff: {
    width: '100%',
    height: 120,
    justifyContent: 'space-around',
    position: 'relative',
  },
  staffLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#333',
  },
  noteCircle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    marginLeft: -15,
  },
  noteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NoteDisplay;