import React from 'react';
import {Share, View, Button, Alert } from 'react-native';


export default ShareButton = (props) => {
    let recipe = props.link
    console.log(recipe)

    const onShare = async () => {
        try {
            const result = await Share.share({
                url: props.link,
                message: "Check this out!",
                title: "useless title"
                

            });
            if (SpeechRecognitionResultList.action === Share.sharedAction) {
                if (SpeechRecognitionResultList.activityType) {
                    console.log("shared with activity type of " + result.activityType)
                } else {
                    console.log(shared)
                    Alert.alert("shared!")
                }
            } else if ( result.action === Share.dismissedAction) {
                console.log(dimsisssed)
            }
            
        } catch (error) {
            Alert.alert(error.message)
        }
    };

    return (
        <View style={{ marginTop: 50}}>
            <Button onPress={onShare} title="Share" />
        </View>
    
    )
}