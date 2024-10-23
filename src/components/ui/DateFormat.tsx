import { StyleSheet, Text ,View} from "react-native";
import { ColorsList } from "../../util/Colors";

const days = ['Sunday','Monday','Tuesday','Wednsday','Thursday','Friday','Saturday']
const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

function superScript(date:number){
    if (date === 1 || date === 21 || date === 31) {
    return 'st';
    }
    if (date === 2 || date === 22) {
    return 'nd';
    }
    if (date === 3 || date === 23) {
    return 'rd';
    }
    return 'th';
}

export function dayFormatter(Date:Date) : React.JSX.Element{

const date = Date.getDate()
const dayIndex = Date.getDay();
const monthIndex = Date.getMonth();
const year = Date.getFullYear().toString();


return(
    <View style={styles.dateContainer}>
        <Text  style={styles.text}> {days[dayIndex]},  {months[monthIndex]} {date}</Text>
        <Text style={styles.superscript}>{superScript(date)}  </Text>
        <Text style={styles.text}>{year}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    superscript:{
        fontSize : 12,
        lineHeight:24,
        textAlignVertical: 'top',
        color:ColorsList.primary50,
        
    },
    text:{
        fontSize:14,
        lineHeight:20,
        color:ColorsList.primary50,
        textAlignVertical:'bottom'
    },
    dateContainer:{
        flexDirection:'row'
    }
    })