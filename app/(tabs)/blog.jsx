import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { images } from '../../constants';

const Card = ({ title, author, date, image, body, isExpanded, onPress }) => {
   return (
    <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardAuthor}>{`by ${author}`}</Text>
        <Text style={styles.cardDate}>{date}</Text>
        <Image source={image} style={styles.cardImage} resizeMode='cover' />
        <Text
          style={styles.cardBody}
          numberOfLines={isExpanded ? undefined : 3}
        >
          {body}
        </Text>
      <TouchableOpacity onPress={onPress}>
        {isExpanded ? (
          <Text style={styles.collapseText}>Tap to Collapse</Text>
        ) : (
          <Text style={styles.expandText}>Tap to Expand</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const Blog = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setExpandedIndex(null); 
  };

  const articles = [
    {
      title: 'Recent Updates Made to AI Model',
      author: 'The PosePal Team',
      date: 'October 5, 2024',
      image: images.yogaClass,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra neque magna, id commodo mi tincidunt id...',
    },
    {
      title: '5 Tips for a Healthier Mindset',
      author: 'The PosePal Team',
      date: 'September 10, 2024',
      image: images.deadlift,
      body: 'Suspendisse sit amet nulla dapibus, consequat dui ut, posuere massa. Etiam molestie libero ipsum, quis viverra magna efficitur sed...',
    },
    {
      title: 'How to Build Lasting Fitness Habits',
      author: 'The PosePal Team',
      date: 'August 20, 2024',
      image: images.food,
      body: 'Cras sit amet sapien dui. Maecenas quis augue at velit suscipit tempor id ac dolor. Ut et ante a magna semper mattis vel vitae magna...',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <Text style={styles.heading}>Recent Community Announcement!</Text>

        {/* Recent Article Card */}
        <Card
          title={articles[0].title}
          author={articles[0].author}
          date={articles[0].date}
          image={articles[0].image}
          body={articles[0].body}
          isExpanded={expandedIndex === 0}
          onPress={() => openModal(articles[0])}
        />

        <Text style={styles.subheading}>Fun Articles from the Past</Text>

        {/* Past Articles */}
        {articles.slice(1).map((article, index) => (
          <Card
            key={index + 1}
            title={article.title}
            author={article.author}
            date={article.date}
            image={article.image}
            body={article.body}
            isExpanded={expandedIndex === index + 1}
            onPress={() => openModal(article)}
          />
        ))}
      </ScrollView>

      {/* Full-Screen Modal */}
      {selectedArticle && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <Text style={styles.modalAuthor}>{`by ${selectedArticle.author}`}</Text>
              <Text style={styles.modalDate}>{selectedArticle.date}</Text>
              <Image source={selectedArticle.image} style={styles.modalImage} resizeMode='cover' />
              <Text style={styles.modalBody}>{selectedArticle.body}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '500',
    color: '#b0b0b0',
    marginTop: 30,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: '#161622',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  cardDate: {
    fontSize: 12,
    color: '#6e6e6e',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 14,
    color: '#d0d0d0',
    lineHeight: 20,
  },
  expandText: {
    color: 'orange',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  collapseText: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 14,
    color: '#6e6e6e',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    color: '#d0d0d0',
    lineHeight: 24,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Blog;

