import Hashids from 'hashids';

const hashKey = process.env.HASH_KEY;
const hashids = new Hashids(hashKey, 12);

const IDService = {
  encodeId(id) {
    return hashids.encode(Number(id));
  },

  decodeId(encodedId) {
    const decoded = hashids.decode(encodedId);
    if (decoded.length === 0) {
      console.error('Invalid ID format:', encodedId);
      throw new Error('Invalid ID format');
    }
    return BigInt(decoded[0]);
  },
};

export default IDService;
