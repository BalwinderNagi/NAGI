import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Define topic type
interface TheoryTopic {
  id: string;
  title: string;
  content: string;
}

// Define the different theory topics
const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 'notes',
    title: 'Notes and the Staff',
    content: `
      Music is written on a set of five lines called a staff. Each line and space represents a different note.
      
      The treble clef (𝄞) is used for higher notes, typically played with the right hand. 
      The bass clef (𝄢) is used for lower notes, typically played with the left hand.
      
      The notes on the lines of the treble clef (from bottom to top) are E, G, B, D, and F.
      The notes in the spaces of the treble clef spell out FACE.
      
      The notes on the lines of the bass clef (from bottom to top) are G, B, D, F, and A.
      The notes in the spaces of the bass clef are A, C, E, and G.
    `
  },
  {
    id: 'rhythm',
    title: 'Rhythm and Time Signatures',
    content: `
      Rhythm in music is the pattern of long and short sounds and silences.
      
      Time signatures tell you how many beats are in each measure and what kind of note gets one beat.
      For example, in 4/4 time (the most common time signature), there are 4 beats per measure, and a quarter note gets one beat.
      
      The most common note values are:
      - Whole note (𝅝): 4 beats in 4/4 time
      - Half note (𝅗𝅥): 2 beats in 4/4 time
      - Quarter note (♩): 1 beat in 4/4 time
      - Eighth note (♪): 1/2 beat in 4/4 time
      - Sixteenth note (𝅘𝅥𝅯): 1/4 beat in 4/4 time
      
      Rests indicate silence and have the same time values as their corresponding notes.
    `
  },
  {
    id: 'scales',
    title: 'Scales and Key Signatures',
    content: `
      A scale is a series of notes arranged in ascending or descending order.
      
      The major scale follows the pattern of whole and half steps: W-W-H-W-W-W-H.
      The C major scale (C, D, E, F, G, A, B, C) uses only white keys on the piano.
      
      The natural minor scale follows the pattern: W-H-W-W-H-W-W.
      The A minor scale (A, B, C, D, E, F, G, A) also uses only white keys.
      
      Key signatures show which notes are to be played sharp (♯) or flat (♭) throughout a piece, indicating the key of the music.
      
      Circle of Fifths: A useful tool that shows the relationship between major and minor keys and their key signatures.
    `
  },
  {
    id: 'chords',
    title: 'Chords and Harmony',
    content: `
      A chord is a group of three or more notes played together.
      
      A triad is a three-note chord consisting of a root, third, and fifth.
      - Major triads have a major third and perfect fifth above the root (e.g., C-E-G)
      - Minor triads have a minor third and perfect fifth above the root (e.g., C-E♭-G)
      - Diminished triads have a minor third and diminished fifth above the root (e.g., C-E♭-G♭)
      - Augmented triads have a major third and augmented fifth above the root (e.g., C-E-G♯)
      
      Chord progressions are sequences of chords that form the harmonic foundation of music.
      Common chord progressions include:
      - I-IV-V-I (C-F-G-C in the key of C major)
      - I-V-vi-IV (C-G-Am-F in the key of C major)
      - ii-V-I (Dm-G-C in the key of C major)
    `
  },
  {
    id: 'intervals',
    title: 'Intervals and Ear Training',
    content: `
      An interval is the distance between two notes. Intervals are named according to the number of letter names they span and their quality.
      
      Main interval qualities:
      - Perfect: unison, 4th, 5th, octave
      - Major/Minor: 2nd, 3rd, 6th, 7th
      - Augmented/Diminished: any interval that has been increased/decreased by a half step
      
      Ear training is the practice of identifying musical elements by ear. This includes recognizing intervals, chords, scales, and rhythms.
      
      Tips for developing your ear:
      - Practice singing intervals with a reference pitch
      - Play intervals on the piano and try to identify them without looking
      - Use interval songs (familiar melodies that begin with specific intervals) as memory aids
    `
  }
];

const MusicTheory = () => {
  const [selectedTopic, setSelectedTopic] = useState<TheoryTopic | null>(null);

  const renderTopicsList = () => {
    return (
      <View style={styles.topicsContainer}>
        <Text style={styles.title}>Music Theory</Text>
        {THEORY_TOPICS.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicButton}
            onPress={() => setSelectedTopic(topic)}
          >
            <Text style={styles.topicButtonText}>{topic.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTopicContent = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedTopic(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.contentTitle}>{selectedTopic.title}</Text>
        </View>
        <ScrollView style={styles.contentScroll}>
          <Text style={styles.contentText}>{selectedTopic.content}</Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {selectedTopic ? renderTopicContent() : renderTopicsList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
  },
  topicsContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  topicButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topicButtonText: {
    fontSize: 18,
    color: '#444',
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4a90e2',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  contentScroll: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default MusicTheory;