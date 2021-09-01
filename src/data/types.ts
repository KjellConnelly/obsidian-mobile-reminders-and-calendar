export type ReminderType = {
  title: string,
  notes: string,
  dueDate: any,
  priority: string,
  isFlagged: string,
  url: string,
  images: {
    basenames: Array<string>,
    extensions: Array<string>
  },
  parentReminder: {
    title: string,
    creationDate: string
  },
  hasAlarms: string,
  reminderLocation: Array<string> | any,
  creationDate: string
}
