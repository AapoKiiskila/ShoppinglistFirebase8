import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, ScrollView } from 'react-native'
import { addDoc, deleteDoc, doc, collection, firestore, serverTimestamp, ITEMS, onSnapshot, query, orderBy } from './firebase/Config.js'
import Constants from 'expo-constants'
import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, ITEMS), orderBy('created', 'desc'))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempItems = []
      querySnapshot.forEach((doc) => {
        tempItems.push({...doc.data(), id: doc.id})
      })
      setItems(tempItems)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const save = async() => {
    if (newItem.trim() === '') {
      return
    }

    const docRef = await addDoc(collection(firestore, ITEMS), {
      text: newItem,
      created: serverTimestamp()
    }).catch (error => console.log(error))

    setNewItem('')
  }

  const remove = async(id) => {
    await deleteDoc(doc(firestore, ITEMS, id))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping list</Text>
      <View style={styles.form}>
        <TextInput 
          placeholder='Add new item...'
          value={newItem}
          onChangeText={text => setNewItem(text)}
        />
        <Button title='Save' onPress={save}/>
      </View>
      <ScrollView>
        {
          items.map((item) => (
            <View style={styles.shoppinglistItem} key={item.id}>
              <Text>{item.text}</Text>
              <Ionicons 
                name='trash'
                size={24}
                onPress={() => remove(item.id)}
              />
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 8
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  shoppinglistItem: {
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
})