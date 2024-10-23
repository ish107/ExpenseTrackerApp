import React from 'react'
import DatePicker from 'react-native-date-picker'
import { ColorsList } from '../../util/Colors'

type calendarProps ={
    opened : boolean,
    //closed : boolean,
    onConfirm : (date:Date)=>void,
    onCancel : ()=>void,
    Date : Date
}

function CalendarPicker(props:calendarProps)  {
  return (
    <DatePicker
      modal
      open={props.opened}
      date={props.Date}
      onConfirm={props.onConfirm}
      onCancel={props.onCancel}
      mode="date"
      buttonColor={ColorsList.primary800}
      dividerColor={ColorsList.primary800}
    />
  )
}

export default CalendarPicker;