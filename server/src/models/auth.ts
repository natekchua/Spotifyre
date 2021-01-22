import * as D from 'io-ts/lib/Decoder';

export const InAuthDTODecoder = D.type({
  code: D.string
});

export const InGetMeDTODecoder = D.type({
  accessToken: D.string
});

export type InAuthDTO = D.TypeOf<typeof InAuthDTODecoder>;
export type InGetMeDTO = D.TypeOf<typeof InGetMeDTODecoder>;
