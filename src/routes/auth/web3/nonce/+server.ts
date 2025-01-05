import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { connection } from '$lib/components/web3/solana';

export const GET: RequestHandler = async ({ url: { searchParams } }) => {
	const platform = searchParams.get('platform');
	if (platform !== 'solana') throw new Error();

	const recentBlockhash = await connection.getLatestBlockhashAndContext();

	return json({
		nonce: recentBlockhash.context.slot
	});
};
