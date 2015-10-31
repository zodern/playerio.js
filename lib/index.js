import * as PlayerIO from './playerio';

// Export the entire default namespace
export default PlayerIO;

// Initialize the default namespace for browsers
if (typeof window !== 'undefined') {
	window.PlayerIO = PlayerIO;
}
