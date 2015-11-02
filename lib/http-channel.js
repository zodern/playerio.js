import http from 'http';
import messages from './models/protobuf-messages';
import converter from './helpers/converter';

const HOST = 'api.playerio.com';
const BASE_PATH = '/api/';

/**
 * @private
 */
export default class HttpChannel {
	static get default() {
		return defaultHttpChannel;
	}

	constructor(playerToken) {
		this.playerToken = playerToken;
	}

	request(method, request, successMessage, successCallback, errorCallback) {
		// Always use PlayerIOError as an errorMessage
		this.customRequest(method, request, successMessage, messages.PlayerIOError, successCallback, (err) => {
			errorCallback(converter.toPlayerIOError(err));
		})
	}

	customRequest(method, request, successMessage, errorMessage, successCallback, errorCallback) {
		let options = {
			host: HOST,
			path: BASE_PATH + method,
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'playertoken': this.playerToken
			}
		}

		let req = http.request(options, (res) => {
			let data = [];
			res.on('data', (obj) => {
				data.push(obj);
			});

			res.on('end', () => {
				let buffer = Buffer.concat(data);
				res = this._readHead(buffer);
				if (res.success) {
					successCallback(successMessage.decode(buffer, res.offset));
				} else {
					errorCallback(errorMessage.decode(buffer, res.offset));
				}
			});
		});

		req.write(request);
		req.end();
	}

	_readHead(buffer) {
		let pointer = 0;
		let hasToken = buffer.readInt8(pointer++);

		if (hasToken === 1) {
			let length = buffer.readInt16BE(pointer);
			pointer += 2;
			this.playerToken = buffer.toString('utf-8', pointer, length);
			pointer += length;
		}

		return {
			success: buffer.readInt8(pointer++) === 1,
			offset: pointer
		};
	}
}

let defaultHttpChannel = new HttpChannel('');
