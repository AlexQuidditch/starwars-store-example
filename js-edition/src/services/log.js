import Environment from './environment';

function getMessageFromEnv (value) {
  if (Environment.isProduction) {
    return JSON.stringify(value);
  }
  return value;
}

/**
 * * Logs API request
 * @param {string} name - имя запроса
 * @param {any} params - параметры запроса
 * @param {any} response - ответ
 */
export default function (name, params, response, errors) {
  console.group('%c API Request ', 'color: white; background-color: #2274A5', getMessageFromEnv(name));
  console.log(
    'params:\n', getMessageFromEnv(params), '\n\n'
    + 'response:\n', getMessageFromEnv(response), '\n\n'
    + 'errors:\n', getMessageFromEnv(errors),
  );
  console.groupEnd();
  if (Environment.isProduction) { console.clear(); }
}
