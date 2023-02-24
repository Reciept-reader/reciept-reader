import { Text, View, StyleSheet, Button } from 'react-native';
import React, {useState} from 'react';

const receiptData = {
    user_id: '483aeb03-4566-459c-9035-5553483a22ef',
    store_name: 'Safeway',
    date: '11/11/1111',
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
    
    // hardcoded data that is going to be replaced with data returned from db

    return (
      <View style={styles.view}>
        
        <Text>Store: {receiptData.store}</Text>
        <Text>Date: {receiptData.date}</Text>
        <Text>Total: {receiptData.total}</Text>
        <Button onPress={postdata(receiptData)} title="Click me!"></Button>
      </View>
    );
}

const styles = StyleSheet.create( {
    view: {
        alignItems: 'center',
        padding:20,
        paddingBottom:40,  
    }
});
export default EditToDB;