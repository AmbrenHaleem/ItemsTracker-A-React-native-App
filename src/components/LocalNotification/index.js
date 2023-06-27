import {View, Text, Switch, Platform, Pressable} from 'react-native'
import {useState, useEffect} from 'react'
import styles from './styles'
import * as Notifications from 'expo-notifications'
import * as database from '../../database';

export default function LocalNotification(){
const [reminder, setReminder] = useState(false);
const [schedule, setSchedule] = useState([]);
// State for the list of items.
const [items, setItems] = useState([]);

const handleReminderPress = async () => {
   
    if (!reminder) {
         // get items expiring in 2 days
 
         const data = await database.loadItemExpiringInTwoDays();
         if (data){
          // console.log('Expiring items : ', data);
           setItems(data);
         } 
        const scheduled = await scheduleReminder();
        //console.log('Scheduled : ', schedule);
        if (scheduled) {
            setReminder(true);
            setSchedule(await getSchedule());
        }
    }
    else{
        const cancelled = await cancelReminder();
        //console.log('cancelled : ', cancelled);
        if (cancelled){
            setReminder(false);
            setSchedule(await getSchedule());
        }
    }
}

//Load schedule reminders.
useEffect(() =>{
   (async () => {
        const previouslyScheduled = await getSchedule();
        //console.log('previouslySchedule', previouslyScheduled);
        setSchedule(previouslyScheduled);
         if (previouslyScheduled.find((item) => item.type === 'reminder')){
             setReminder(true);
         }
   })();
}, []);

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Notifications:</Text>
            <Text style = {styles.description}>
                Remind me about the items going to expire soon
            </Text>

            {/* Option */}
            <View style = {styles.options.container}>
                <Switch 
                value= {reminder}
                onValueChange={handleReminderPress}
                />
                <Pressable onPress={handleReminderPress}>
                    <Text style = {styles.options.label}>
                        Set Reminder
                    </Text>
                </Pressable>
            </View>

            {/* Logs */}
            {/* <View style={styles.logs.container}>
                <Text style={styles.logs.title}>
                    Scheduled Notification: {schedule.length}
                </Text>
                {schedule.map((item, index) => (
                    <Text key={index} style={styles.logs.text}>
                    {item.type}: {item.id}
                    </Text>
                ))}
                
            </View> */}
        </View>
    );
}

async function scheduleReminder(){
    console.log('Schedule')
    try{
        //check for permission
        const permissions = await Notifications.getPermissionsAsync();
        //console.log('Permission:' , permissions);
        if(!permissions.granted){
            const request = await Notifications.requestPermissionsAsync({
                ios: {
                    allowsAlert: true,
                    allowsSound: true,
                    allowsBadge: true
                }
            });
            //console.log('-Request:', request);
            if (!request.granted){
                return false;
            }
            return true;
        }
       
       
        //console.log('scheduleNotificationAsync');
        //schedule a notification.
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Items going to expire soon',
                body: 'Remember to consume items before it will get expired.',
                sound: true,
                data: {
                    userId: 1114113,
                    userName: 'Ambreen',
                    type: 'reminder'
                }
            },
            trigger: {
                seconds: 5,
                //hour: 8,
                //minute: 0,
                repeats: true
            }
        });
       
        //console.log('Schedule Id : ',id);
        if (!id) {
            return false;
        }
        //permission granted!
        return true;
    }
    catch {
        return false;
    }
}

async function cancelReminder(){
    //console.log('cancel')

    let cancelled = false;
    try{
        const schedule = await getSchedule();
        //console.log('Schedule: ', schedule);
       
            for (const item of schedule) {
               
                if (item.type === 'reminder'){
                    //console.log('Item Type: ', item.type);
                    await Notifications.cancelScheduledNotificationAsync(item.id);
                    //console.log('Cancelled:', item.id);
                    cancelled = true;
                }
            }
        //was it cancelled?
        //console.log('was cancelled', cancelled);
        return cancelled;
    } 
    catch{
        return cancelled;
    }
}

async function getSchedule(){
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    //console.log('Schedule:', scheduledNotifications);
    const schedule = [];
    scheduledNotifications.forEach((scheduledNotification) => {
       // console.log('Schedule notification:', scheduledNotification);
        schedule.push({
            id: scheduledNotification.identifier,
            type: scheduledNotification.content.data.type
        });
    });
    return schedule;
}

