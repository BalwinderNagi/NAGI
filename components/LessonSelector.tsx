import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Define the lesson type
export interface Lesson {
  id: string;
  title: string;
  level: string;
  duration: string;
  content: string;
}

// Define the component props type
interface LessonSelectorProps {
  onSelectLesson: (lesson: Lesson) => void;
}

// Sample lessons data
const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Piano',
    level: 'Beginner',
    duration: '15 min',
    content: 'Welcome to your first piano lesson! In this lesson, you will learn about the basic layout of a piano keyboard, how to sit properly at the piano, and the correct hand positioning. The piano keyboard consists of white and black keys arranged in a pattern. The white keys represent the natural notes (A, B, C, D, E, F, G), while the black keys represent the sharps and flats. Start by placing your hands on the keyboard with your thumbs on middle C (the white key in the middle of the keyboard). Keep your fingers curved and relaxed, as if holding a small ball in each hand.'
  },
  {
    id: '2',
    title: 'Reading Sheet Music',
    level: 'Beginner',
    duration: '20 min',
    content: 'Understanding sheet music is essential for learning to play the piano. In this lesson, you will learn about the staff, clefs, notes, and basic rhythms. Sheet music is written on a staff, which consists of five lines and four spaces. Each line and space represents a different note. The treble clef (usually played with the right hand) and the bass clef (usually played with the left hand) tell you which notes are represented by each line and space. Notes are represented by oval shapes placed on the lines or in the spaces. The position of a note on the staff tells you which key to play, and the appearance of the note tells you how long to hold it.'
  },
  {
    id: '3',
    title: 'Playing Your First Scale',
    level: 'Beginner',
    duration: '15 min',
    content: 'Scales are fundamental building blocks in music. In this lesson, you will learn how to play the C major scale. The C major scale consists of the notes C, D, E, F, G, A, B, and C (an octave higher). It uses only the white keys on the piano. Start with your right thumb on middle C, and use one finger for each consecutive note in the scale (thumb for C, index finger for D, middle finger for E, and so on). After playing G with your pinky, move your thumb under to play A, and continue with your index finger on B and middle finger on the higher C. Practice this scale going up and down, maintaining a steady rhythm and consistent finger pressure.'
  },
  {
    id: '4',
    title: 'Basic Chords',
    level: 'Intermediate',
    duration: '25 min',
    content: 'Chords are groups of notes played together to create harmony. In this lesson, you will learn about major and minor triads. A triad consists of three notes: the root, the third, and the fifth. In a major triad, the third is a major third (four half steps) above the root, and the fifth is a perfect fifth (seven half steps) above the root. For example, a C major triad consists of the notes C, E, and G. In a minor triad, the third is a minor third (three half steps) above the root, while the fifth remains a perfect fifth above the root. For example, a C minor triad consists of the notes C, E♭ (E flat), and G. Practice playing these chords with both hands, focusing on pressing all keys simultaneously and with equal pressure.'
  },
  {
    id: '5',
    title: 'Playing Your First Song',
    level: 'Intermediate',
    duration: '30 min',
    content: 'Now that you have learned about notes, scales, and chords, it\'s time to put your skills together to play a simple song. In this lesson, you will learn to play "Twinkle, Twinkle, Little Star." This song uses simple patterns and repetition, making it perfect for beginners. We\'ll break down the melody into smaller sections and practice each one separately before combining them. We\'ll also discuss how to coordinate both hands, with the right hand playing the melody and the left hand providing harmonic support with simple chords. By the end of this lesson, you\'ll be able to play the entire song with confidence.'
  },
];

const LessonSelector: React.FC<LessonSelectorProps> = ({ onSelectLesson }) => {
  const renderLessonItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.lessonCard}
      onPress={() => onSelectLesson(item)}
    >
      <View style={styles.lessonHeader}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <View style={styles.lessonBadge}>
          <Text style={styles.lessonLevel}>{item.level}</Text>
        </View>
      </View>
      <Text style={styles.lessonDuration}>{item.duration}</Text>
      <Text style={styles.lessonPreview}>
        {item.content.substring(0, 100)}...
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piano Lessons</Text>
      <FlatList
        data={LESSONS}
        renderItem={renderLessonItem}
        keyExtractor={item => item.id}
        style={styles.lessonList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  lessonList: {
    width: '100%',
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  lessonBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lessonLevel: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  lessonDuration: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  lessonPreview: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default LessonSelector;