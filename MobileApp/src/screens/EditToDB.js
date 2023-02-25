import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import React, {useState} from 'react';



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
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eHRtaGp6dGxmc2Zqb3J1cmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyOTczNTcsImV4cCI6MTk5MDg3MzM1N30.o7s0gThwzgZ7OdeskinJc5Fz9A95fuUek22E1isUoYE',
    //     },
    //     body: JSON.stringify(input),
    // };

    // fetch('https://ixxtmhjztlfsfjorurfi.functions.supabase.co/reciept', options);
    alert('you clicked me!')
    
}


function EditToDB() {
    
    const [store_nameDB, onChangeName] = useState('')
    const [dateDB, onChangeDate] = useState('')
    const [totalDB, onChangeTotal] = useState('')

    arr = new Array();
    if(receiptData.date == '') {
        receiptData.date = new Date().toLocaleDateString('en-US')
    }
    
    itemsDB = receiptData.items
    if (itemsDB.length > 0) {
        let i = 0
    }

    return (
      <View style={styles.view}>
        <TextInput 
        style={styles.input}
        placeholder={receiptData.store_name}
        value={store_nameDB}
        onChangeText={onChangeName}
        />

        <TextInput 
        style={styles.input} 
        placeholder={receiptData.date}
        value={dateDB}
        onChangeText={onChangeDate}
        />
        
        {itemsDB.map((item, index) => 

            <TextInput
            key={`item${index}`}
            style={styles.input}
            placeholder={item.item_name} />
            
        )} 

        <TextInput 
        style={styles.input} 
        placeholder={receiptData.total}
        value={totalDB}
        onChangeText={onChangeTotal}
        />
        
        <Button onPress={ () => postdata(receiptData)} title="Click me!"></Button>
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