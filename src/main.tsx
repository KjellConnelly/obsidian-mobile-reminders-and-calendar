import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import ReminderAndCalendarSettings, { DEFAULT_SETTINGS, DEFAULT_SETTINGS_DEV } from './data/ReminderAndCalendarSettings'
import ReminderAndCalendarSettingTab from './ui/ReminderAndCalendarSettingTab'
import React from 'react'
import ReactDOM from 'react-dom'
import ReminderView from './ui/ReminderView'
import { ReminderType } from './data/types'
import buildInfo from './data/buildInfo.json'

export default class ReminderAndCalendarPlugin extends Plugin {
	settings: ReminderAndCalendarSettings

	async onload() {
		await this.loadSettings()
		this.addSettingTab(new ReminderAndCalendarSettingTab(this))

		this.addCommand({
			id: 'open-sample-modal',
			name: 'Open Sample Modal',
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						new SampleModal(this).open();
					}
					return true;
				}
				return false;
			}
		})
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, (buildInfo.build=='prod'?DEFAULT_SETTINGS:DEFAULT_SETTINGS_DEV), await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}

class SampleModal extends Modal {
	plugin: ReminderAndCalendarPlugin

	constructor(plugin:ReminderAndCalendarPlugin) {
		super(plugin.app)
		this.plugin = plugin
	}

	onOpen() {
		let {contentEl, plugin} = this;
		const reminders : Array<ReminderType> = plugin.settings.reminders
		ReactDOM.render( <ReminderView reminders={reminders} />, contentEl )
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}


/*
Todo:
2. Also need to add an updated date field

*/
