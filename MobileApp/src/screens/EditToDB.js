import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import React, {useState} from 'react';

const EditToDB = ({ route, navigation }) => {
    const receiptData = route.params.receiptData;
    const userid = route.params.userid;

    const postdata = (input) => {
        let s_store = store_nameDB
        let s_total = totalDB
        if (s_store.trim() == '') s_store = receiptData.store_name
        if (s_total.trim() == '') s_total = receiptData.total
    
        // const options = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eHRtaGp6dGxmc2Zqb3J1cmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyOTczNTcsImV4cCI6MTk5MDg3MzM1N30.o7s0gThwzgZ7OdeskinJc5Fz9A95fuUek22E1isUoYE',
        //     },
        //     body: JSON.stringify(input),
        // };
    
        // fetch('https://ixxtmhjztlfsfjorurfi.functions.supabase.co/reciept', options);
        
        navigation.replace('HomeScreen', {userid: userid})
    }
    
    const [store_nameDB, onChangeName] = useState('')
    const [dateDB, onChangeDate] = useState('')
    const [totalDB, onChangeTotal] = useState('')

    arr = new Array();
    if(receiptData.date == '') {
        receiptData.date = new Date().toLocaleDateString('en-US')
    }
    
    itemsDB = receiptData.items
    
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
        
        {itemsDB.map((item) => 
            <>
            <TextInput
            key={`item${item.id}`}
            style={styles.input}
            placeholder={item.item_name} />
            <TextInput key={`price${item.id}`}
            style={styles.input}
            placeholder={`${item.price}`} />
            </>
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