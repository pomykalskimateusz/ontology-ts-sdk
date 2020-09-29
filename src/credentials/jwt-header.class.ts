import {SignatureScheme} from "../crypto";
import * as b64 from "base64-url";

export class JwtHeader {
    alg?: string;
    kid?: string;
    typ: string;

    constructor(alg?: string, kid?: string) {
        this.alg = alg;
        this.kid = kid;
        this.typ = 'JWT';
    }

    public serialize(
        algorithm: SignatureScheme | undefined,
        publicKeyId: string | undefined
    ): string {
        let header;
        if (algorithm !== undefined) {
            header = {
                alg: algorithm.labelJWS,
                typ: 'JWT',
                kid: publicKeyId
            };
        } else {
            header = {
                typ: 'JWT'
            };
        }
        return b64.encode(JSON.stringify(header), 'utf-8');
    }

    public static deserialize(encoded: string): JwtHeader {
        const decoded = b64.decode(encoded);
        const header = JSON.parse(decoded);

        return new JwtHeader(
            header.alg,
            header.kid
        );
    }
}