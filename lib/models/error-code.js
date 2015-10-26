/* @flow */

let errorCode = {
	UnsupportedMethod: 0,
	GeneralError: 1,
	InternalError: 2,
	AccessDenied: 3,
	InvalidMessageFormat: 4,
	MissingValue: 5,
	GameRequired: 6,
	ExternalError: 7,
	ArgumentOutOfRange: 8,
	GameDisabled: 9,
	UnknownGame: 10,
	UnknownConnection: 11,
	InvalidAuth: 12,
	NoServersAvailable: 13,
	RoomDataTooLarge: 14,
	RoomAlreadyExists: 15,
	UnknownRoomType: 16,
	UnknownRoom: 17,
	MissingRoomId: 18,
	RoomIsFull: 19,
	NotASearchColumn: 20,
	QuickConnectMethodNotEnabled: 21,
	UnknownUser: 22,
	InvalidPassword: 23,
	InvalidRegistrationData: 24,
	InvalidBigDBKey: 25,
	BigDBObjectTooLarge: 26,
	BigDBObjectDoesNotExist: 27,
	UnknownTable: 28,
	UnknownIndex: 29,
	InvalidIndexValue: 30,
	NotObjectCreator: 31,
	KeyAlreadyUsed: 32,
	StaleVersion: 33,
	CircularReference: 34,
	HeartbeatFailed: 40,
	InvalidGameCode: 41,
	VaultNotLoaded: 50,
	UnknownPayVaultProvider: 51,
	DirectPurchaseNotSupportedByProvider: 52,
	BuyingCoinsNotSupportedByProvider: 54,
	NotEnoughCoins: 55,
	ItemNotInVault: 56,
	InvalidPurchaseArguments: 57,
	InvalidPayVaultProviderSetup: 58,
	UnknownPartnerPayAction: 70,
	InvalidType: 80,
	IndexOutOfBounds: 81,
	InvalidIdentifier: 82,
	InvalidArgument: 83,
	LoggedOut: 84,
	InvalidSegment: 90,
	GameRequestsNotLoaded: 100,
	AchievementsNotLoaded: 110,
	UnknownAchievement: 111,
	NotificationsNotLoaded: 120,
	InvalidNotificationsEndpoint: 121,
	NetworkIssue: 130,
	OneScoreNotLoaded: 131,
	YahooNotAvailable: 200,
	YahooNotLoaded: 201,
	DialogClosed: 301,
	AdTrackCheckCookie: 302
};

errorCode.getName = function(value: number) {
	for (let key in errorCode) {
		if (errorCode.hasOwnProperty(key)) {
			if (errorCode[key] === value) {
				return key;
			}
		}
	}

	return null;
}

Object.freeze(errorCode);

export default errorCode;
