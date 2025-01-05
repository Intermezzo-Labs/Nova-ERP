import base58 from 'bs58';
import nacl from 'tweetnacl';

import jwt from 'jsonwebtoken';

import { connection } from '$lib/components/web3/solana';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import {
	PRIVATE_SUPABASE_API_KEY,
	PRIVATE_SUPABASE_JWT_SECRET,
	PRIVATE_SUPABASE_SERVICE_ROLE
} from '$env/static/private';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

const BLOCK_VALID_FOR_N_SECONDS = 60;

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const signatureUint8 = base58.decode(body.signature);
	const pubKeyUint8 = base58.decode(body.publicKey);

	// is the nonce a legit recent block?
	const blockTime = await connection.getBlockTime(body.nonce);
	if (!blockTime) throw 'Unable to get blocktime';

	const now = Date.now() / 1000;
	const isRecent = blockTime > now - BLOCK_VALID_FOR_N_SECONDS ? true : false;

	const nonceUint8 = new TextEncoder().encode(
		`Sign this message to log in to Nova ERP // ${body.nonce}`
	);
	const verified = nacl.sign.detached.verify(nonceUint8, signatureUint8, pubKeyUint8) && isRecent;

	if (!verified) throw verified;

	// create a row in our user table (if it's not there already)
	const url = `${PUBLIC_SUPABASE_URL}/rest/v1/user`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			apikey: PRIVATE_SUPABASE_API_KEY,
			authorization: `Bearer ${PRIVATE_SUPABASE_SERVICE_ROLE}`,
			'content-type': 'application/json; charset=utf-8',
			prefer: 'resolution=merge-duplicates'
		},
		body: JSON.stringify({
			public_key: body.publicKey
		})
	});
	console.log('wow, did it owrk?', res);

	// sign jwt
	const payload = {
		publicKey: body.publicKey,
		exp: Math.floor(Date.now() / 1000) + 60 * 60
	};

	const accessToken = jwt.sign(JSON.stringify(payload), PRIVATE_SUPABASE_JWT_SECRET);

	return json({
		accessToken
	});
};
