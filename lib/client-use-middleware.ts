import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

const throwOnHttpError: Middleware = {
	async onResponse({ response }) {
		if (response.ok) {
			return undefined;
		}
		const cloned = response.clone();
		// JSONパースに失敗したらテキストを取得
		const details = await cloned.json().catch(() => cloned.text());
		// ステータスと詳細を含むエラーを投げる
		throw new Error(`HTTP ${response.status}: ${JSON.stringify(details)}`);
	},
};

const client = createClient<paths>({
	baseUrl: "http://localhost:3000/api",
});

client.use(throwOnHttpError);

export default client;
