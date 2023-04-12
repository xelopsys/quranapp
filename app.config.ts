import { ConfigContext, ExpoConfig } from "expo/config";

const Config = {
	apiUrl: "http://localhost:3000",
	clientBackend: "http://localhost:8010/proxy",
};

if (process.env.NODE_ENV === "main") {
	Config.apiUrl = "https://sugurtabozor.uz";
	Config.clientBackend = "https://netkost.uz";
} else if (process.env.NODE_ENV === "staging") {
	Config.apiUrl = "https://staging.sugurtabozor.uz";
	Config.clientBackend = "https://staging.netkost.uz";
}

export default ({ config }: ConfigContext): ExpoConfig => {
	const { extra } = config;
	return {
		...config,
		extra: {
			...extra,
			...Config,
		},
	} as ExpoConfig;
};
