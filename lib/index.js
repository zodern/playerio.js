import PlayerIO from './playerio';
import Message from './models/message';
import * as ErrorCode from './enums/error-code';

// Export the entire default namespace
export default PlayerIO;

// Initialize the default namespace for browsers
if (typeof window !== 'undefined') {
	window.PlayerIO = PlayerIO;

	// Add every public class and enum to the base namespace
	PlayerIO.Message = Message;
	PlayerIO.ErrorCode = ErrorCode;
}
