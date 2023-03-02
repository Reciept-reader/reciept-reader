import { Text, View, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../components/CustomButton/CustomButton';

import { insertReceipt } from '../functions/userDataFun';

const EditToDB = ({ route, navigation }) => {
    // Get parameters passed from the Camera screen
    const receiptData = route.params.receiptData;
    const userid = route.params.userid;
    const url = route.params.url
    
    // default item declaration used while adding an item or if there
    // are no items scanned
    const defaultItem = [{item_name: '', price: ''}]

    // Use states for the items, store name, date, and total
    // If the user updates any items, store name, date, total, the 
    // app will replace the current stored value with the udpated value
    const [itemContent, setItemContent] = useState(receiptData.items);
    const [store_nameDB, onChangeName] = useState('');
    const [dateDB, onChangeDate] = useState('');
    const [totalDB, onChangeTotal] = useState('');
    
    // If there are no items read in the receipt, create a default
    if(receiptData.items !== undefined) {
        // setItemContent(receiptData.items);
        // alert(receiptData.items)
    }

    // Changes the item content based on the index, not a valid
    // solution for saving changes made by user.
    // Changes the item naem
    const changeItemContent = (text, index) => {
        let newItemContent = [...itemContent]
        newItemContent[index].item_name = text
        setItemContent(newItemContent)
    }

    // Changes the item content based on the index, not a valid
    // solution for saving changes made by user.
    // Changes the price
    const changePriceContent = (text, index) => {
        let newItemContent = [...itemContent]
        newItemContent[index].price = text
        setItemContent(newItemContent)
    }
    
    // If the OCR reads an item that is invalid, or the user creates
    // a custom item that they no longer want, removes entry from the
    // page, and removes from the data
    const removeInput = (index) => {
        let input = [...itemContent];
        input.splice(index, 1)
        setItemContent(input)
    }
    
    // Adds an input to the end of the list of items, to add a new
    // item name, and price
    const addInput = () => {
        return setItemContent([...itemContent, defaultItem])
    }
    const updateReceipt = () => {
        let s_store = store_nameDB
        let s_total = totalDB
        if (s_store.trim() == '') s_store = receiptData.store_name
        if (s_total.trim() == '') s_total = receiptData.total

        const s_ReceiptData = {
            user_id: userid,
            store_name: s_store,
            date: dateDB,
            total: s_total,
            items: undefined,
            url: url,
        }
        return s_ReceiptData
    };

    const postdata = async () => { 
        let s_ReceiptData = updateReceipt()
        await insertReceipt(s_ReceiptData, itemContent)
        for (let i in itemContent) {
            alert(`item: ${itemContent[i].item_name} price: ${itemContent[i].price}`)
        }
        navigation.replace('HomeScreen', {userid: userid})
    }
    
    if(receiptData.date == '') {
        receiptData.date = new Date().toLocaleDateString('en-US')
    }
    
    
    return (
      <View style={styles.view}>
        <ScrollView>
        <Text style={styles.header}>Your Receipt Data</Text>
        <Text>Store Name: </Text>
        <TextInput 
        style={styles.input}
        placeholder={receiptData.store_name}
        value={store_nameDB}
        onChangeText={onChangeName}
        />

    <Text>Date: </Text>
        <TextInput 
        style={styles.input} 
        placeholder={receiptData.date}
        value={dateDB}
        onChangeText={onChangeDate}
        />
        
        { itemContent.map((item, index) => 
            <>
                <TextInput
                key={`item${item.id}`}
                style={styles.input}
                placeholder={item.item_name} 
                onChangeText={text => changeItemContent(text, index)}
                />
                <TextInput key={`price${item.id}`}
                style={styles.input}
                placeholder={`${item.price}`} 
                onChangeText={text => changePriceContent(text, index)}
                />
                <Button title='Delete' onPress={() => removeInput(index)} />
            </>
        )} 

        <Text>Price: </Text>
        <TextInput 
        style={styles.input} 
        placeholder={receiptData.total}
        value={totalDB}
        onChangeText={onChangeTotal}
        />
        
        <CustomButton onPress={ () => postdata()} text="Save"></CustomButton>
        <CustomButton onPress={ () => addInput(receiptData)} text="Add Input"></CustomButton>
        </ScrollView>
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
    header:{
        fontSize: 36,
    },
});
export default EditToDB;