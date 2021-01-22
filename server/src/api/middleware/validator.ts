import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import * as D from 'io-ts/lib/Decoder';
import { Decoder } from 'io-ts/lib/Decoder';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';

function validator<T> (decoder: Decoder<unknown, T>): RequestHandler<ParamsDictionary, any, T> {
  return (req, res, next) => {
    return pipe(
      decoder.decode(req.body),
      fold(
        // Failure path
        errors => res.status(400).send({ code: 'BadArgument', status: 'error', error: D.draw(errors) }),
        // Success path
        () => next()
      )
    );
  };
}

export { validator };
