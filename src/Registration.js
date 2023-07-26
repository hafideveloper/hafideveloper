import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../config'


const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://deneme-b95b0.firebaseapp.com',
            })
            .then(() => {
                alert('Doğrulama e-postası gönderildi')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                    
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error => {
            alert(error.message)
        }))
    }

    return (
        
        <View style ={styles.container}>
          
            <View style ={{marginTop:5}}>
                <TextInput
                 style={styles.textInput}
                 placeholder="Ad"
                 onChangeText={(firstName) => setFirstName(firstName)}
                 autoCorrect={false}
                 placeholderTextColor={'#000000'}
                />  

                <TextInput 
                 style ={styles.textInput}
                 placeholder="Soyad"
                 onChangeText={(lastName) => setLastName(lastName)}
                 autoCorrect={false}
                 placeholderTextColor={'#000000'}
                />
                <TextInput
                 style={styles.textInput}
                 placeholder= "Email"
                 onChangeText={(email) => setEmail(email)}
                 autoCapitalize='none'
                 autoCorrect={false}
                 keyboardType="email-address"
                 placeholderTextColor={'#000000'}
                />
                <TextInput
                style={styles.textInput}
                placeholder="Şifre"
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                placeholderTextColor={'#000000'}
                />

            </View>
            <TouchableOpacity
            onPress={() => registerUser(email, password, firstName, lastName)}
            style={styles.button}
            >
                <Text style={{ color:"#1c0f45",fontSize:17, fontWeight:'bold' }}> Kayıt Ol </Text>

            </TouchableOpacity>
        </View>
    )

}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        marginTop:130,
    },
    textInput: {
        justifyContent: 'center',
        width:250,
        height:50,
        fontSize:17,
        borderColor:'#000080',
        borderRadius:100,
        borderWidth:1,
        marginBottom:10,
        textAlign:'center',
        backgroundColor:'#6495ED',

    },
    button:{
        marginTop:10,
        height:45,
        width:100,
        backgroundColor:'#1E90FF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        borderColor:'#000080',
        borderWidth:1,
    },
   
})