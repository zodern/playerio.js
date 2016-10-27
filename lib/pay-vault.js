import PlayerIOError from './models/playerio-error';
import ProtobufMessages from './models/protobuf-messages';
import Converter from './helpers/converter';

export default class PayVault {

  constructor(channel) {
    this._channel = channel;
    this._version = '';
    this._coins = 0;
    this._items = [];
  }

  coins() {
    if (this._version !== '') {
      return this._coins;
    }
    throw new PlayerIOError(50, 'Cannot access coins before vault has been loaded. Please refresh the vault first');
  }

  items() {
    if (this._version !== '') {
      return this._items;
    }
    throw new PlayerIOError(50, 'Cannot access items before vault has been loaded. Please refresh the vault first');
  }

  has(key) {
    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i].itemKey === key) {
        return true;
      }
    }
    return false;
  }

  readHistory(page, pageSize, callback, errorHandler) {
    throw new Error('PayVault ReadHistory not implemented');
  }

  refresh(callback, errorHandler) {
    let args = new ProtobufMessages.PayVaultRefreshArgs({
      lastVersion: this._version,
      targetUserId: null
    }).encode().toBuffer();

    this._channel.request(
      163, args, ProtobufMessages.PayVaultRefreshOutput, (output) => {
        this._parseVault(output);
        callback();
      }, errorHandler);
  }

  /**
   *
   * @param provider
   * @param purchaseArguments
   * @param items
   * @param callback
   * @param errorHandler
   */
  getBuyCoinsInfo(provider, purchaseArguments, callback, errorHandler) {
    let args = new ProtobufMessages.PayVaultPaymentInfoArgs({
      provider,
      purchaseArguments: Converter.toKeyValuePairs(purchaseArguments),
      items: null
    }).encode().toBuffer();

    this._channel.request(181, args, ProtobufMessages.PayVaultPaymentInfoOutput, (result) => {
      console.dir(result);
      callback(Converter.toKeyValueObject(result.providerArguments));
    }, errorHandler);
  }

  _parseVault(vault) {
    if (vault.valueContents !== null) {
      console.dir(vault);
      this._version = vault.valueContents.version;
      this._coins = vault.valueContents.coins || 0;
      this._items = vault.valueContents.items;
    }
  }
}
