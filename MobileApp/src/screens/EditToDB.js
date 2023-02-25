import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import React, {useState} from 'react';

const [receiptItems, addItem] = useState([])

const receiptData = {
    user_id: '3',
    store_name: 'Safeway',
    date: '',
    total: '100',
    items: [

        {item_name: 'pizza', price: 99},
        {item_name: 'nerd', price: 88},
        {item_name: 'more food', price: 77}
    ]
};

function postdata(input) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eHRtaGp6dGxmc2Zqb3J1cmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyOTczNTcsImV4cCI6MTk5MDg3MzM1N30.o7s0gThwzgZ7OdeskinJc5Fz9A95fuUek22E1isUoYE',
        },
        body: JSON.stringify(input),
    };

    fetch('https://ixxtmhjztlfsfjorurfi.functions.supabase.co/reciept', options);
}


function EditToDB() {
    
    store_nameDB = receiptData.store_name
    dateDB = receiptData.date
    totalDB = receiptData.total

    if(dateDB == '') {
        dateDB = new Date().toLocaleDateString('en-US')
    }
    
    return (
      <View style={styles.view}>
        <TextInput style={styles.input} placeholder={store_nameDB}/>
        <TextInput style={styles.input} placeholder={dateDB}/>
        <TextInput style={styles.input} placeholder={totalDB}/>
        <Button onPress={postdata(receiptData)} title="Click me!"></Button>
      </View>
    );
}

const styles = StyleSheet.create( {
    view: {
        alignItems: 'center',
        padding:20,
        paddingBottom:40,  
    },
    input:{
        backgroundColor: 'white',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        
        height: 40,
        paddingHorizontal: 10,
        marginVertical: 10,

        fontWeight: 'bold',
        color: 'black',
        textDecorationColor:'black',
    },
});
export default EditToDB;