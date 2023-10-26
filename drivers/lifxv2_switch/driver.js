'use strict';

const Homey = require('homey');
const Logger = require('../../lib/console_logger');
const MasterDriver = require('../lifxv2/driver');

class LIFX_LAN_Driver_lifxv2_switch extends MasterDriver {

	/**
	 * LIFX Driver Init.
	 */
	onInit() {
		this.Log = new Logger(`LIFX LAN Driver: ${this.id}`);
		this.Log.Log('Starting up..');
		this.Log.Log('Starting completed.');
	} //onInit

	onPair(socket) {
		let self = this;
		socket.setHandler("list_devices", async (data) => {
			var foundDevices = self.homey.app.GetSupportedDevices(1, 'LIFX Switch');
			var pairableDevices = [];
			foundDevices.forEach(function (lifxDevice) {
				pairableDevices.push({
					data: {
						id: lifxDevice.DeviceID,
						app: 'com.sdn.lifx-lan2'
					},
					name: lifxDevice.Name,
					icon: `../../../device_icons/${lifxDevice.VendorId}_${lifxDevice.ProductId}.svg`
				});
			});
			return pairableDevices;
		});
	} //onPair

}

module.exports = LIFX_LAN_Driver_lifxv2_switch;
