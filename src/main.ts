import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import ReminderAndCalendarSettings, { DEFAULT_SETTINGS } from './data/ReminderAndCalendarSettings'
import ReminderAndCalendarSettingTab from './ui/ReminderAndCalendarSettingTab'
import testReminders from './testing/testReminders.json'

export default class ReminderAndCalendarPlugin extends Plugin {
	settings: ReminderAndCalendarSettings

	async onload() {
		await this.loadSettings()
		this.addSettingTab(new ReminderAndCalendarSettingTab(this))
		console.log(testReminders)
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}


/*
Todo:

1. On Shortcuts, it needs to return proper json.
- REMINDERS: images.basenames & images.extensions need to be wrapped in [], and quotes around each item.
- REMINDERS: parentReminder MIGHT need a comma...
- CALENDAR: location returns multiple lines... [] and "" around.
2. Also need to add an updated date field

*/
