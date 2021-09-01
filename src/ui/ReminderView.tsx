import React from 'react'
import { Flex, Box, Heading, Text, Link, Card, Button } from 'rebass'
import { ReminderType } from './../data/types'

type ComponentProps = {
  reminders: Array<ReminderType>
}

type ComponentState = {

}

export default class ReminderView extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState
  moment: any

  constructor(props:ComponentProps) {
    super(props)
    this.state = {

    }
    this.moment = window.moment
  }

  sort(reminders : Array<ReminderType>) {
    const sortBy = 'day'

    const { moment } = this

    // break apart into reminders with dueDates, and reminders without dueDates
    let withDate : Array<ReminderType> = []
    let noDate : Array<ReminderType> = []
    for (let i = 0; i < reminders.length; i++) {
      if (reminders[i].dueDate == "") {
        noDate.push(reminders[i])
      } else {
        withDate.push(reminders[i])
      }
    }

    // change dates into moments
    for (let i = 0; i < withDate.length; i++) {
      withDate[i].dueDate = moment(withDate[i].dueDate)
    }

    // sort ones with dueDates by date
    withDate.sort((a, b)=>{
      const diff = a.dueDate.valueOf() - b.dueDate.valueOf()
      return diff
    })

    // sort into groups of days
    let days = []
    if (sortBy == 'day') {
      for (let i = 0; i < withDate.length; i++) {
        let newDay = true
        const formatted = withDate[i].dueDate.format('MM-DD-YYYY')
        for (let j = 0; j < days.length; j++) {
          if (days[j].formattedDate == formatted) {
            newDay = false
            days[j].reminders.push(withDate[i])
          }
        }
        if (newDay) {
          days.push({
            formattedDate:formatted,
            reminders:[withDate[i]],
          })
        }
      }
    }

    return {
      days:days,
      noDate:noDate,
    }
  }

  render() {
    const {days, noDate} = this.sort(this.props.reminders)
    const now = window.moment()
    return (
      <div>
        <Box sx={{

        }}>

        {days.map((day, i)=>{
          const remindersDueDate  = day.reminders[0].dueDate
          const todayString = now.isSame(remindersDueDate, 'day') ? "today " : ""
          let dayTitle = ""
          if (now.isSame(remindersDueDate, 'year')) {
            dayTitle += remindersDueDate.format('M/D ddd')
          } else {
            dayTitle += remindersDueDate.format('M/D/YYYY ddd')
          }
          dayTitle += " ("
          const dayDiff = remindersDueDate.diff(now, 'days')
          dayTitle += now.isSame(remindersDueDate, 'day') ? "today" : `in ${dayDiff} day${Math.abs(dayDiff)==1?"":"s"}`
          dayTitle += ")"
          return(
          <ReminderSection key={`reminderDaySection${i}`} title={dayTitle} sectionNumber={i}>
            {day.reminders.map((reminder,j)=>{
              const {title,notes,dueDate,priority,isFlagged,url,images,parentReminder,hasAlarms,reminderLocation,creationDate} = reminder
              const timeFormatted = dueDate.format(`h:mma`) + " (" + dueDate.from(now) + ")"
              return(
                <ReminderCard key={`reminderDay${i}reminder${j}`}>
                  <Flex>
                    {title &&
                      <Box>
                        <Text fontSize={2}>
                          {title}
                        </Text>
                      </Box>}
                  </Flex>
                  {dueDate &&
                    <Box>
                      <Text>
                        {timeFormatted}
                      </Text>
                    </Box>
                  }
                  {reminderLocation &&
                    <Box pl={2}>
                      <Link href={`http://maps.apple.com/?saddr=here&daddr=${encodeURIComponent(reminderLocation.join(', '))}`}>
                        {reminderLocation.map((line,k)=>{return (
                          <Text key={`link${i}_${j}_${k}`}>{line}</Text>
                        )})}
                      </Link>
                    </Box>
                  }
                </ReminderCard>
            )})}
          </ReminderSection>
        )})}

          <ReminderSection title={"No due date"} sectionNumber={days.length}>
            {noDate.map((reminder,i)=>{
              const {title,notes,dueDate,priority,isFlagged,url,images,parentReminder,hasAlarms,reminderLocation,creationDate} = reminder
              return(
                <ReminderCard key={`noDate${i}`}>
                  <Flex>
                    {title && <Box><Text>{title}</Text></Box>}
                  </Flex>
                </ReminderCard>
            )})}
          </ReminderSection>
        </Box>
      </div>
    )
  }
}

type SectionProps = {
  title: string
  sectionNumber: number,
}

type SectionState = {

}

class ReminderSection extends React.Component<SectionProps, SectionState> {
  render() {
    const {sectionNumber} = this.props
    return (
      <Box mb={3}>
        <Flex alignItems='flex-end'>
          <Box flex='1 1 auto' mb={2}>
            <Text fontSize={3}>
              {this.props.title}
            </Text>
          </Box>
          <Box>
            <Button variant='outline' py={1} my={1} onClick={()=>{
              console.log(`section ${sectionNumber} focused`)
            }}>
              Focus
            </Button>
          </Box>

        </Flex>
        <Box>
          {this.props.children}
        </Box>
      </Box>
    )
  }
}

type CardProps = {

}

type CardState = {

}

class ReminderCard extends React.Component<CardProps, CardState> {
  render() {
    return (
      <Card m={1} p={2} bg="rgba(0,0,0,0.2)" css={{borderRadius:4}}>
        {this.props.children}
      </Card>
    )
  }
}

/*
{day.reminders.map((reminder,j)=>{
  const {title,notes,dueDate,priority,isFlagged,url,images,parentReminder,hasAlarms,reminderLocation,creationDate} = reminder
  return(
    <Flex key={`reminderDay${i}reminder${j}`} ml={2}>
      {title && <Box><Text mx={1}>{title}</Text></Box>}
      {dueDate && <Box><Text mx={1}>{dueDate}</Text></Box>}
    </Flex>
)})}
*/
