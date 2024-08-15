import React, { useState, useEffect } from 'react';
import { View, Text, Switch, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
  text: string;
  enabled: boolean;
}

const ListViewScreen: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) setItems(JSON.parse(storedItems));
    };
    loadItems();
  }, []);

  const toggleSwitch = async (index: number) => {
    const newItems = [...items];
    newItems[index].enabled = !newItems[index].enabled;
    setItems(newItems);
    await AsyncStorage.setItem('items', JSON.stringify(newItems));
  };

  const addItem = async () => {
    const newItems = [...items, { text: newItem, enabled: false }];
    setItems(newItems);
    await AsyncStorage.setItem('items', JSON.stringify(newItems));
    setNewItem('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
            <Switch
              onValueChange={() => toggleSwitch(index)}
              value={item.enabled}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default ListViewScreen;
