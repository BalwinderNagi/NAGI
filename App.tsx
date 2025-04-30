import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import PianoKeyboard from './components/PianoKeyboard';
import LessonSelector, { Lesson } from './components/LessonSelector';
import NoteDisplay from './components/NoteDisplay';
import MusicTheory from './components/MusicTheory';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'practice':
        return (
          <View style={styles.contentContainer}>
            <NoteDisplay />
            <PianoKeyboard />
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentScreen('home')}
            >
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        );
      case 'lessons':
        return (
          <View style={styles.contentContainer}>
            <LessonSelector 
              onSelectLesson={(lesson) => {
                setCurrentLesson(lesson);
                setCurrentScreen('lessonDetail');
              }}
            />
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentScreen('home')}
            >
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        );
      case 'lessonDetail':
        return (
          <View style={styles.contentContainer}>
            <ScrollView style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>{currentLesson?.title}</Text>
              <Text style={styles.lessonText}>{currentLesson?.content}</Text>
            </ScrollView>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentScreen('lessons')}
            >
              <Text style={styles.backButtonText}>Back to Lessons</Text>
            </TouchableOpacity>
          </View>
        );
      case 'theory':
        return (
          <View style={styles.contentContainer}>
            <MusicTheory />
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentScreen('home')}
            >
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Piano Teacher App</Text>
            <View style={styles.menuContainer}>
              <TouchableOpacity 
                style={styles.menuButton} 
                onPress={() => setCurrentScreen('practice')}
              >
                <Text style={styles.menuButtonText}>Practice Piano</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuButton} 
                onPress={() => setCurrentScreen('lessons')}
              >
                <Text style={styles.menuButtonText}>Piano Lessons</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuButton} 
                onPress={() => setCurrentScreen('theory')}
              >
                <Text style={styles.menuButtonText}>Music Theory</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  menuContainer: {
    width: '80%',
  },
  menuButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
  },
  lessonContent: {
    width: '100%',
    maxHeight: '80%',
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  lessonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});