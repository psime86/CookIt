import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { View, ScrollView, AsyncStorage, Text } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import GroceryTitle from '../components/GroceryTitle';
import GroceryCard from '../components/GroceryCard';
import API from '../utils/API'

class GroceryList extends React.Component {

  state = {
    // define state component here
    UserUID: "",
    shoppingList: ""
  }

  // define functions here

  // "componentDidMount" here to grab Async User data and all User document "shoppingList" objects to map through later 

  componentDidMount() {
    
    // Get id (fb UID) and set state of "UserUID"
    _getIdAsyncData = async () => {
      try {
        let userIdData = await AsyncStorage.getItem("uidFB");
        if (userIdData !== null) {
          console.log(userIdData)
          this.setState({ UserUID: userIdData })
          console.log("setting UserUID state to: " + userIdData)
          console.log(this.state.UserUID)
        } else {
          console.log("userIdData came back as 'null' from Async.")
        }
      } catch (error) {
        console.log("error retrieving userIdData from Async.");
        console.log("getItem error: " + error)
      }
    }

    // Call function to retrieve UID from Async
    _getIdAsyncData()
      .then( () => {
        console.log("made it this far")
        this.getUserDataFromDB()
      })

    
    
  }
    

  getUserDataFromDB = () => {
    
    // Grab User "shoppingList"
    API.findUserByUID()
      .then(res => {
        console.log("made it inside next function")
        console.log(res);
        
        for (let i=0; i < res.length; i++) {

          if (res[i].uidFB == JSON.parse(this.state.UserUID)) {
            console.log("match found")
            console.log(res[i])
            this.loopShoppingList(res[i].shoppingList)

            // res[i].shoppingList.map( itemId => {
            //   console.log(itemId)
            //   API.findListById(itemId)
            //     .then(res => {
            //       console.log("now return list item")
            //       console.log(res)
            //       shoppingListArray.push(res)
            //     })
            // })
            
            //   console.log("after pushing to shopping list array and log")
            //   console.log(shoppingListArray)
            
            
          }
        }
        //this.setState({})
      })
  }

  loopShoppingList = (shoppingListIdArray) => {
      let shoppingListArray = [];

      shoppingListIdArray.map( eachId => {
        console.log(eachId)
              API.findListById(eachId)
                .then(res => {
                  console.log("now return list item")
                  console.log(res)
                  shoppingListArray.push(res)
                  this.setState({ shoppingList: shoppingListArray })
                  console.log("state of shoppingList =")
                  console.log(this.state.shoppingList)
                })
      })
      
  }
  


  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GroceryTitle style={{ flex: 2, height: 50 }} />
      </View>

      {this.state.shoppingList.length ? 
      (
        <View style={styles.container}>
          {this.state.shoppingList.map((listObject, i) => (
            <GroceryCard key={i}
              title={listObject.title}
              list={listObject.ingredients} // Map through the ingredients array????
            />
          ))}
        </View>
      )
      :
      (
        <View style={styles.container}>
          <Text>No recipes in list</Text >
        </View>
      )}

      {/* <View style={styles.container}>
        <GroceryCard />
        
      </View> */}
    </ScrollView>
    )
  }
}

export default GroceryList;

// export default function GroceryList() {
//   return (
//     <ScrollView>
//       <View style={{ flex: 1, flexDirection: 'column' }}>
//         <GroceryTitle style={{ flex: 2, height: 50 }} />
//       </View>
//       <View style={styles.container}>
//         <GroceryCard />
//         <GroceryCard />
//       </View>
//     </ScrollView>
//   );
// }

const styles = {
  container: {
    padding: 10,
    backgroundColor: 'rgb(218,168,185)',
  },
};
