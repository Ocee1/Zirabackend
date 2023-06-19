
import { SECRET_KEY } from '../constants';
import { compare, hash } from 'bcrypt';
import { sign, verify, Secret } from 'jsonwebtoken';

// interface IConstants {
//     SECRET_KEY: any,
// };

const SECRET: Secret = typeof(SECRET_KEY);

class Crypto {
    constructor() {}

    static encrypt = async (data: any, expiresIn: string) => {
        const result = await sign(data, SECRET, {algorithm: 'HS512', expiresIn: expiresIn || '1d'});
        return result;
    };

    static decrypt = async (jwtToken: string) => {
        const result = verify(jwtToken, SECRET);
        return result;

    };

    static hashString = async (data: string) => {
        const hashedPassword = await hash(data.trim(), 11);
    };

    static compareStrings = async (toBeComparedString: string, hashedString: string) => {
        const result = await compare(toBeComparedString.trim(), hashedString);
        return result;
    };

}

export default Crypto;
