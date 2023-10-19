import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = () => setIsModalVisible(true);
  const closeModalHandler = () => setIsModalVisible(false);
  const addGoalHandler = (enteredGoal) => {
    setGoals((prev) => [
      ...prev,
      {
        text: enteredGoal,
        id: Math.random().toString(),
      },
    ]);
  };

  const removeItem = (id) => {
    setGoals((prev) => {
      return prev.filter((currentItem) => currentItem.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add new goal"
          color="#5e0acc"
          onPress={openModalHandler}
        />
        <GoalInput
          addGoal={addGoalHandler}
          visible={isModalVisible}
          closeModal={closeModalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
              return <GoalItem goal={itemData.item} removeGoal={removeItem} />;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  goalsContainer: {
    flex: 4,
  },
});
