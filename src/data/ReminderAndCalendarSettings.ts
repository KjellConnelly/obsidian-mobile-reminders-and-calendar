import testReminders from '../testing/testReminders.json'
import testCalendar from '../testing/testReminders.json'

export default interface ReminderAndCalendarSettings {
	calendar: any,
	reminders: any,
}

export const DEFAULT_SETTINGS: ReminderAndCalendarSettings = {
	calendar:{},
	reminders:{}
}

export const DEFAULT_SETTINGS_DEV: ReminderAndCalendarSettings = {
	calendar:testCalendar,
	reminders:testReminders,
}
