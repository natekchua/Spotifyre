import * as D from 'io-ts/lib/Decoder';

export const AuthDecoder = D.type({
  code: D.string
});

export type Auth = D.TypeOf<typeof AuthDecoder>;
