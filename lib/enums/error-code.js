/**
 * Represents the type of a PlayerIOError.
 */
export default class ErrorCode {
	/**
	 * The method requested is not supported.
	 * @type {number}
	 */
	get unsupportedMethod() { return 0; }

	/**
	 * A general error occurred.
	 * @type {number}
	 */
	get generalError() { return 1; }

	/**
	 * An unexpected error occurred inside the Player.IO web service. Please try again.
	 * @type {number}
	 */
	get internalError() { return 2; }

	/**
	 * Access is denied.
	 * @type {number}
	 */
	get accessDenied() { return 3; }

	/**
	 * The message is malformatted.
	 * @type {number}
	 */
	get invalidMessageFormat() { return 4; }

	/**
	 * A value is missing.
	 * @type {number}
	 */
	get missingValue() { return 5; }

		/**
	 * A game is required to do this action.
	 * @type {number}
	 */
	get gameRequired() { return 6; }

	/**
	 * An error occurred while contacting an external service.
	 * @type {number}
	 */
	get externalError() { return 7; }

	/**
	 * The given argument value is outside the range of allowed values.
	 * @type {number}
	 */
	get argumentOutOfRange() { return 8; }

	/**
	 * The game has been disabled, most likely because of missing payment.
	 * @type {number}
	 */
	get gameDisabled() { return 9; }

	/**
	 * The game requested is not known by the server.
	 * @type {number}
	 */
	get unknownGame() { return 10; }

	/**
	 * The connection requested is not known by the server.
	 * @type {number}
	 */
	get unknownConnection() { return 11; }

	/**
	 * The auth given is invalid or malformatted.
	 * @type {number}
	 */
	get invalidAuth() { return 12; }

	/**
	 * There is no server in any of the selected server clusters for the game that are eligible to start a new room in (they're all at full capacity or there are no servers in any of the clusters). Either change the selected clusters for your game in the admin panel, try again later or start some more servers for one of your clusters.
	 * @type {number}
	 */
	get noServersAvailable() { return 13; }

	/**
	 * The room data for the room was over the allowed size limit.
	 * @type {number}
	 */
	get roomDataTooLarge() { return 14; }

	/**
	 * You are unable to create room because there is already a room with the specified ID.
	 * @type {number}
	 */
	get roomAlreadyExists() { return 15; }

	/**
	 * The game you're connected to does not have a room type with the specified name.
	 * @type {number}
	 */
	get unknownRoomType() { return 16; }

	/**
	 * There is no room running with that ID.
	 * @type {number}
	 */
	get unknownRoom() { return 17; }

	/**
	 * You can't join the room when the roomId is null or an empty string.
	 * @type {number}
	 */
	get missingRoomId() { return 18; }

	/**
	 * The room already has the maxmium amount of users in it.
	 * @type {number}
	 */
	get roomIsFull() { return 19; }

	/**
	 * The key you specified is not set as searchable. You can change the searchable keys in the admin panel for the server type.
	 * @type {number}
	 */
	get notASearchColumn() { return 20; }

	/**
	 * The QuickConnect method (Simple, Facebook, Kongregate, etc.) is not enabled for the game. You can enable the various methods in the admin panel for the game.
	 * @type {number}
	 */
	get quickConnectMethodNotEnabled() { return 21; }

	/**
	 * The user is unknown.
	 * @type {number}
	 */
	get unknownUser() { return 22; }

	/**
	 * The password supplied is incorrect.
	 * @type {number}
	 */
	get invalidPassword() { return 23; }

	/**
	 * The supplied registration data is incorrect.
	 * @type {number}
	 */
	get invalidRegistrationData() { return 24; }

	/**
	 * The key given for the BigDB object is not a valid BigDB key. Keys must be between 1 and 50 characters. Only letters, numbers, hyphens, underscores, and spaces are allowed.
	 * @type {number}
	 */
	get invalidBigDBKey() { return 25; }

	/**
	 * The object exceeds the maximum allowed size for BigDB objects.
	 * @type {number}
	 */
	get bigDBObjectTooLarge() { return 26; }

	/**
	 * Could not locate the database object.
	 * @type {number}
	 */
	get bigDBObjectDoesNotExist() { return 27; }

	/**
	 * The specified table does not exist.
	 * @type {number}
	 */
	get unknownTable() { return 28; }

	/**
	 * The specified index does not exist.
	 * @type {number}
	 */
	get unknownIndex() { return 29; }

	/**
	 * The value given for the index, does not match the expected type.
	 * @type {number}
	 */
	get invalidIndexValue() { return 30; }

	/**
	 * The operation was aborted because the user attempting the operation was not the original creator of the object accessed.
	 * @type {number}
	 */
	get notObjectCreator() { return 31; }

	/**
	 * The key is already in use by another database object.
	 * @type {number}
	 */
	get keyAlreadyUsed() { return 32; }

	/**
	 * BigDB object could not be saved using optimistic locks as it's out of date.
	 * @type {number}
	 */
	get staleVersion() { return 33; }

	/**
	 * Cannot create circular references inside database objects.
	 * @type {number}
	 */
	get circularReference() { return 34; }

	/**
	 * The server could not complete the heartbeat.
	 * @type {number}
	 */
	get heartbeatFailed() { return 40; }

	/**
	 * The game code is invalid.
	 * @type {number}
	 */
	get invalidGameCode() { return 41; }

	/**
	 * Cannot access coins or items before vault has been loaded. Please refresh the vault first.
	 * @type {number}
	 */
	get valueNotLoaded() { return 50; }

	/**
	 * There is no PayVault provider with the specified ID.
	 * @type {number}
	 */
	get unknownPayVaultProvider() { return 51; }

	/**
	 * The specified PayVault provider does not support direct purchases.
	 * @type {number}
	 */
	get directPurchaseNotSupportedByProvider() { return 52; }

	/**
	 * The specified PayVault provider does not support buying coins.
	 * @type {number}
	 */
	get buyingCoinsNotSupportedByProvider() { return 54; }

	/**
	 * The user does not have enough coins in the PayVault to complete the purchase or debit.
	 * @type {number}
	 */
	get notEnoughCoins() { return 55; }

	/**
	 * The item does not exist in the vault.
	 * @type {number}
	 */
	get itemNotInVault() { return 56; }

	/**
	 * The chosen provider rejected one or more of the purchase arguments.
	 * @type {number}
	 */
	get invalidPurchaseArguments() { return 57; }

	/**
	 * The chosen provider is not configured correctly in the admin panel.
	 * @type {number}
	 */
	get invalidPayVaultProviderSetup() { return 58; }

	/**
	 * Unable to locate the custom PartnerPay action with the given key.
	 * @type {number}
	 */
	get unknownPartnerPayAction() { return 70; }

	/**
	 * The given type was invalid.
	 * @type {number}
	 */
	get invalidType() { return 80; }

	/**
	 * The index was out of bounds from the range of acceptable values.
	 * @type {number}
	 */
	get indexOutOfBounds() { return 81; }

	/**
	 * The given identifier does not match the expected format.
	 * @type {number}
	 */
	get invalidIdentifier() { return 82; }

	/**
	 * The given argument did not have the expected value.
	 * @type {number}
	 */
	get invalidArgument() { return 83; }

	/**
	 * This client has been logged out.
	 * @type {number}
	 */
	get loggedOut() { return 84; }

	/**
	 * The given segment was invalid.
	 * @type {number}
	 */
	get invalidSegment() { return 90; }

	/**
	 * Cannot access requests before refresh() has been called.
	 * @type {number}
	 */
	get gameRequestsNotLoaded() { return 100; }

	/**
	 * Cannot access achievements before refresh() has been called.
	 * @type {number}
	 */
	get achievementsNotLoaded() { return 110; }

	/**
	 * Cannot find the achievement with the specified ID.
	 * @type {number}
	 */
	get unknownAchievement() { return 111; }

	/**
	 * Cannot access notification endpoints before refresh() has been called.
	 * @type {number}
	 */
	get notificationsNotLoaded() { return 120; }

	/**
	 * The given notifications endpoint is invalid.
	 * @type {number}
	 */
	get invalidNotificationsEndpoint() { return 121;}

	/**
	 * There is an issue with the network.
	 * @type {number}
	 */
	get networkIssue() { return 130; }

	/**
	 * Cannot access OneScore before refresh() has been called.
	 * @type {number}
	 */
	get oneScoreNotLoaded() { return 131; }

	/**
	 * The Yahoo features are only avaliable when authenticated to PlayerIO using Yahoo authentication. Authentication methods are managed in the connections setting of your game in the admin panel on PlayerIO.
	 * @type {number}
	 */
	get yahooNotAvailable() { return 200; }

	/**
	 * Cannot access profile, friends, ignored before Yahoo has been loaded. Please refresh Yahoo first.
	 * @type {number}
	 */
	get yahooNotLoaded() { return 201; }

	/**
	 * The dialog was closed by the user.
	 * @type {number}
	 */
	get dialogClosed() { return 301; }

	/**
	 * Check cookie required.
	 * @type {number}
	 */
	get adTrackCheckCookie() { return 302; }
}
