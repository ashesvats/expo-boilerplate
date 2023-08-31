module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"expo-router/babel",
			[
				"module-resolver",
				{
					alias: {
						"@": ".",
					},
					extensions: [
						".ios.ts",
						".android.ts",
						".ts",
						".ios.tsx",
						".android.tsx",
						".tsx",
						".jsx",
						".js",
						".json",
					  ],
				},
			],
			["module:react-native-dotenv", {
				"moduleName": "@env",
				"path": ".env",
				"blacklist": null,
				"whitelist": null,
				"safe": false,
				"allowUndefined": true
			}],
			'@babel/plugin-proposal-export-namespace-from',
			"react-native-reanimated/plugin",
		],
	};
};
