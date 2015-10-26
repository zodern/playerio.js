/**
 * The method requested is not supported.
 */
export const UNSUPPORTED_METHOD = 0;

/**
 * A general error occurred.
 */
export const GENERAL_ERROR = 1;

/**
 * An unexpected error occurred inside the Player.IO web service. Please try again.
 */
export const INTERNAL_ERROR = 2;

/**
 * Access is denied.
 */
export const ACCESS_DENIED = 3;

/**
 * The message is malformatted.
 */
export const INVALID_MESSAGE_FORMAT = 4;

/**
 * A value is missing.
 */
export const MISSING_VALUE = 5;

/**
 * A game is required to do this action.
 */
export const GAME_REQUIRED = 6;

/**
 * An error occurred while contacting an external service.
 */
export const EXTERNAL_ERROR = 7;

/**
 * The given argument value is outside the range of allowed values.
 */
export const ARGUMENT_OUT_OF_RANGE = 8;

/**
 * The game has been disabled, most likely because of missing payment.
 */
export const GAME_DISABLED = 9;

/**
 * The game requested is not known by the server.
 */
export const UNKNOWN_GAME = 10;

/**
 * The connection requested is not known by the server.
 */
export const UNKNOWN_CONNECTION = 11;

/**
 * The auth given is invalid or malformatted.
 */
export const iNVALID_AUTH = 12;

/**
 * There is no server in any of the selected server clusters for the game that are eligible to start a new room in (they're all at full capacity or there are no servers in any of the clusters). Either change the selected clusters for your game in the admin panel, try again later or start some more servers for one of your clusters.
 */
export const NO_SERVERS_AVAILABLE = 13;

/**
 * The room data for the room was over the allowed size limit.
 */
export const ROOM_DATA_TOO_LARGE = 14;

/**
 * You are unable to create room because there is already a room with the specified ID.
 */
export const ROOM_ALREADY_EXISTS = 15;

/**
 * The game you're connected to does not have a room type with the specified name.
 */
export const UNKNOWN_ROOM_TYPE = 16;

/**
 * There is no room running with that ID.
 */
export const UNKNOWN_ROOM = 17;

/**
 * You can't join the room when the roomId is null or an empty string.
 */
export const MISSING_ROOM_ID = 18;

/**
 * The room already has the maxmium amount of users in it.
 */
export const ROOM_IS_FULL = 19;

/**
 * The key you specified is not set as searchable. You can change the searchable keys in the admin panel for the server type.
 */
export const NOT_A_SEARCH_COLUMN = 20;

/**
 * The QuickConnect method (Simple, Facebook, Kongregate, etc.) is not enabled for the game. You can enable the various methods in the admin panel for the game.
 */
export const QUICKCONNECT_METHOD_NOT_ENABLED = 21;

/**
 * The user is unknown.
 */
export const UNKNOWN_USER = 22;

/**
 * The password supplied is incorrect.
 */
export const INVALID_PASSWORD = 23;

/**
 * The supplied registration data is incorrect.
 */
export const INVALID_REGISTRATION_DATA = 24;

/**
 * The key given for the BigDB object is not a valid BigDB key. Keys must be between 1 and 50 characters. Only letters, numbers, hyphens, underscores, and spaces are allowed.
 */
export const INVALID_BIGDB_KEY = 25;

/**
 * The object exceeds the maximum allowed size for BigDB objects.
 */
export const BIGDB_OBJECT_TOO_LARGE = 26;

/**
 * Could not locate the database object.
 */
export const BIGDB_OBJECT_DOES_NOT_EXIST = 27;

/**
 * The specified table does not exist.
 */
export const UNKNOWN_TABLE = 28;

/**
 * The specified index does not exist.
 */
export const UNKNOWN_INDEX = 29;

/**
 * The value given for the index, does not match the expected type.
 */
export const INVALID_INDEX_VALUE = 30;

/**
 * The operation was aborted because the user attempting the operation was not the original creator of the object accessed.
 */
export const NOT_OBJECT_CREATOR = 31;

/**
 * The key is already in use by another database object.
 */
export const KEY_ALREADY_USED = 32;

/**
 * BigDB object could not be saved using optimistic locks as it's out of date.
 */
export const STALE_VERSION = 33;

/**
 * Cannot create circular references inside database objects.
 */
export const CIRCULAR_REFERENCE = 34;

/**
 * The server could not complete the heartbeat.
 */
export const HEARTBEAT_FAILED = 40;

/**
 * The game code is invalid.
 */
export const INVALID_GAME_CODE = 41;

/**
 * Cannot access coins or items before vault has been loaded. Please refresh the vault first.
 */
export const VALUE_NOT_LOADED = 50;

/**
 * There is no PayVault provider with the specified ID.
 */
export const UNKNOWN_PAYVAULT_PROVIDER = 51;

/**
 * The specified PayVault provider does not support direct purchases.
 */
export const DIRECT_PURCHASE_NOT_SUPPORTED_BY_PROVIDER = 52;

/**
 * The specified PayVault provider does not support buying coins.
 */
export const BUYING_COINS_NOT_SUPPORTED_BY_PROVIDER = 54;

/**
 * The user does not have enough coins in the PayVault to complete the purchase or debit.
 */
export const NOT_ENOUGH_COINS = 55;

/**
 * The item does not exist in the vault.
 */
export const ITEM_NOT_IN_VAULT = 56;

/**
 * The chosen provider rejected one or more of the purchase arguments.
 */
export const INVALID_PURCHASE_ARGUMENTS = 57;

/**
 * The chosen provider is not configured correctly in the admin panel.
 */
export const INVALID_PAYVAULT_PROVIDER_SETUP = 58;

/**
 * Unable to locate the custom PartnerPay action with the given key.
 */
export const UNKNOWN_PARTNERPAY_ACTION = 70;

/**
 * The given type was invalid.
 */
export const INVALID_TYPE = 80;

/**
 * The index was out of bounds from the range of acceptable values.
 */
export const INDEX_OUT_OF_BOUNDS = 81;

/**
 * The given identifier does not match the expected format.
 */
export const INVALID_IDENTIFIER = 82;

/**
 * The given argument did not have the expected value.
 */
export const INVALID_ARGUMENT = 83;

/**
 * This client has been logged out.
 */
export const LOGGED_OUT = 84;

/**
 * The given segment was invalid.
 */
export const INVALID_SEGMENT = 90;

/**
 * Cannot access requests before refresh() has been called.
 */
export const GAME_REQUESTS_NOT_LOADED = 100;

/**
 * Cannot access achievements before refresh() has been called.
 */
export const ACHIEVEMENTS_NOT_LOADED = 110;

/**
 * Cannot find the achievement with the specified ID.
 */
export const UNKNOWN_ACHIEVEMENT = 111;

/**
 * Cannot access notification endpoints before refresh() has been called.
 */
export const NOTIFICATIONS_NOT_LOADED = 120;

/**
 * The given notifications endpoint is invalid.
 */
export const INVALID_NOTIFICATIONS_ENDPOINT = 121;

/**
 * There is an issue with the network.
 */
export const NETWORK_ISSUE = 130;

/**
 * Cannot access OneScore before refresh() has been called.
 */
export const ONESCORE_NOT_LOADED = 131;

/**
 * The Yahoo features are only avaliable when authenticated to PlayerIO using Yahoo authentication. Authentication methods are managed in the connections setting of your game in the admin panel on PlayerIO.
 */
export const YAHOO_NOT_AVAILABLE = 200;

/**
 * Cannot access profile, friends, ignored before Yahoo has been loaded. Please refresh Yahoo first.
 */
export const YAHOO_NOT_LOADED = 201;

/**
 * The dialog was closed by the user.
 */
export const DIALOG_CLOSED = 301;

/**
 * Check cookie required.
 */
export const ADTRACK_CHECK_COOKIE = 302;
