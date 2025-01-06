import base58 from 'bs58';
import nacl from 'tweetnacl';

import { connection } from '$lib/components/web3/solana';
import { PUBLIC_NONCE_MESSAGE } from '$env/static/public';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { adminAuthClient, getUserByPublicKey } from '$lib/utils/auth';

const BLOCK_VALID_FOR_N_SECONDS = 60;

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const body = await request.json();
	const { publicKey, signature, nonce } = body;

	if (!publicKey || !signature || !nonce) throw new Error('Missing nonce data');

	const signatureUint8 = base58.decode(signature);
	const pubKeyUint8 = base58.decode(publicKey);

	// is the nonce a legit recent block?
	const blockTime = await connection.getBlockTime(nonce);
	if (!blockTime) throw 'Unable to get blocktime';

	const now = Date.now() / 1000;
	const isRecent = blockTime > now - BLOCK_VALID_FOR_N_SECONDS ? true : false;

	const nonceUint8 = new TextEncoder().encode(`${PUBLIC_NONCE_MESSAGE} // ${nonce}`);
	const verified = nacl.sign.detached.verify(nonceUint8, signatureUint8, pubKeyUint8) && isRecent;

	if (!verified) throw verified;

	const { data: existingUser } = await getUserByPublicKey({ publicKey });
	let user = existingUser;

	const email = `${publicKey}@demo.novadova.com`;
	// create a row in our user table (if it's not there already)
	if (!user) {
		const { data, error } = await adminAuthClient.createUser({
			email,
			email_confirm: true,
			password: 'foobar',
			user_metadata: {
				publicKey
			}
		});

		if (error) throw error;
		user = data.user;
	}

	const authTokenResponse = await supabase.auth.signInWithPassword({ email, password: 'foobar' });

	await supabase.auth.setSession({
		access_token: authTokenResponse.data.session!.access_token,
		refresh_token: authTokenResponse.data.session!.refresh_token
	});

	return json({
		ok: true
	});
};
