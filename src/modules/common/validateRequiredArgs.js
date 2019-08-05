const validateArgs = (args, requiredArgs) => {
	requiredArgs.forEach((field) => {
		let currentFieldValue = args[field] || undefined;

		if (currentFieldValue === undefined) {
			throw new Error(`[validateArgs] Field "${field}" is required. Set this as: "--${field}=<field content>"`);
		}
	});
};

module.exports = validateArgs;
