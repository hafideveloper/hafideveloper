import { View, Text, FlatList, StyleSheet, Pressable, Image, textDecorationLine} from 'react-native'
import React, { useState, useEffect} from 'react';

import CountdownComponent from '../Countdownn';


import {firebase} from '../config';

const Homepage = () => {
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('Data');
    

    useEffect(async () => {
        todoRef
        .onSnapshot(
            querySnapshot => {
                const users = []
                querySnapshot.forEach((doc) => {
                    const { price, new_price, food_name, restaurant, adet, img, indirim, discountEndDate  } = doc.data()
                    users.push({
                        id: doc.id,
                        price,
                        new_price,
                        food_name,
                        restaurant,
                        img,
                        indirim,
                        adet,
                        discountEndDate,
                        
                    })
                    
                })
                setUsers(users)
            }
        )
    }, [])

    return(
        <View style={{ flex:1, marginTop:10}}>
            
            
            <FlatList
            style={{height:'100%'}}
            data={users}
            numColumns={1}
            renderItem={({item}) => (
            
            <Pressable
                style={styles.container} >
                  <View style={styles.innerContainer}>

                  <CountdownComponent 
                    discountEndDate={item.discountEndDate}/>
                    
                     <View style={styles.box}>

                     <Text style={styles.itemFood}>{item.food_name}</Text>
                     <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
                     <Text style={styles.itemPrice}>{item.price}</Text>
                     <Text style={styles.itemAdet}>{item.adet}</Text>
                     <Text style={styles.itemİndirim}>{item.indirim}</Text>
                    <Text style={styles.itemNew}>{item.new_price}</Text>



                    <Image style={styles.itemİmg} 
                    source={{ uri: item.img }}  />
                    
                    </View>
                </View>
            </Pressable>
     )}
             />   
        </View>
        
    )
}

export default Homepage

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:5,
        padding:11,
        backgroundColor:'#FEA82F',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#FEA82F'
        
    },
    box:{
        backgroundColor:'#FFC288',
        elevation:7,
        shadowColor:'#026efd',
        alignItems:'center',
        height:130,
        width:340,
        justifyContent:'center'
    },
    innerContainer:{
        alignItems: 'center',
        flexDirection:'column',
    },
    itemFood:{
        top:115,
        left:180,
        alignSelf:'baseline',
        fontWeight: 'bold',
        marginTop:0,
        fontSize:16
    },

    itemİndirim:{
        color:'red', 
        backgroundColor:'#f5f5f5',
        top:43,
        left:280,
        alignSelf:'baseline',
        marginTop:0,
        fontSize:12,
    },
    itemAdet:{
        color:'red',
        backgroundColor:'#f5f5f5',
        top:75,
        left:276,
        alignSelf:'baseline',
        marginTop:0,
        fontSize:12,
    },


    itemRestaurant:{
        top:115,
        left:182,
        alignSelf:'baseline',
        marginTop:0,
        fontSize:10,
    },
    
  
    itemİmg:{
        marginBottom:116,
        height:'100%',
        width:'50%',
        marginRight:170,
        resizeMode:'cover',
    
    },
    itemPrice:{
        top:172,
        left:180,
        alignSelf:'baseline',
        marginTop:5,
        fontWeight:'300',
        textDecorationLine:'line-through',
        
    },
    itemNew:{
        top:115,
        left:222,
        alignSelf:'baseline',
        marginTop:5,
        fontWeight: 'bold'
       
    },
    
})