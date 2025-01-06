import base58 from 'bs58';
import nacl from 'tweetnacl';

import { connection } from '$lib/components/web3/solana';
import { PUBLIC_NONCE_MESSAGE } from '$env/static/public';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { adminAuthClient } from '$lib/utils/auth';

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

	const email = `${publicKey}@demo.novadova.com`;
	const password = 'foobar';
	const getAuthTokenResponse = () => supabase.auth.signInWithPassword({ email, password });

	/**
	 * we cant create supabase users without email or phone. so let's create a phony email addresses using their solana account. we can't get access to the user database table so the `get_user_by_pubkey` database function isn't very useful right now.
	 * stopgap: try to login and if it fails, create a user. ultimately set the session server side.
	 */
	const firstAttempt = await getAuthTokenResponse();
	let token = firstAttempt.data;

	if (!token || firstAttempt.error) {
		console.warn("user doens't exist?", firstAttempt.error);
		// create a row in our user table (if it's not there already)
		const { error: createUserError } = await adminAuthClient.createUser({
			email,
			email_confirm: true,
			password,
			user_metadata: {
				publicKey
			}
		});

		if (createUserError) throw createUserError;
		const secondAttempt = await getAuthTokenResponse();

		if (secondAttempt.error) throw secondAttempt.error;
		token = secondAttempt.data;
	}

	await supabase.auth.setSession({
		access_token: token.session!.access_token,
		refresh_token: token.session!.refresh_token
	});

	return json({
		ok: true
	});
};
