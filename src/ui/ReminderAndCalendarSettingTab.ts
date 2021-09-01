import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import type ReminderAndCalendarPlugin from './../main'

export default class ReminderAndCalendarSettingTab extends PluginSettingTab {
	plugin: ReminderAndCalendarPlugin

	constructor(plugin: ReminderAndCalendarPlugin) {
		super(plugin.app, plugin)
		this.plugin = plugin
	}

	display(): void {
		let {containerEl} = this
		containerEl.empty()

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'})

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					//this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}))
	}
}
