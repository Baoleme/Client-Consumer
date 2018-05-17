import { handleActions } from 'redux-actions';

export function handleActionsWithoutError (config, ...rest) {
  for (const [k, func] of Object.entries(config)) {
    config[k] = (state, payload, ...rest) => {
      if (payload.error) return state;
      return func(state, payload, ...rest);
    };
  }
  return handleActions(config, ...rest);
}
