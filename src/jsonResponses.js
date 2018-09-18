// Helper functions
const createObject = (newMessage, newID) => {
  const obj = {
    message: newMessage,
    id: newID,
  };

  return obj;
};

const respond = (request, response, status, content, type) => {
  const headers = {
    'Content-Type': type,
  };

  response.writeHead(status, headers);
  response.write(content);
  response.end();
};

// 200
const success = (request, response, acceptedTypes) => {
  const obj = createObject('This is a successful response.');

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(obj), 'application/json');
};

// 400
const badRequest = (request, response, acceptedTypes, params) => {
  const obj = createObject('This request has the required parameters.');

  if (!params.valid || params.valid !== 'true') {
    obj.message = 'Missing valid query parameter set to true';

    obj.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${obj.message}</message>`;
      responseXML = `${responseXML} <id>${obj.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }

    return respond(request, response, 400, JSON.stringify(obj), 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(obj), 'application/json');
};

// 401
const unauthorized = (request, response, acceptedTypes, params) => {
  const obj = createObject('This request has the required parameters.');

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    obj.message = 'Missing loggedIn query parameter set to yes';

    obj.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${obj.message}</message>`;
      responseXML = `${responseXML} <id>${obj.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 401, responseXML, 'text/xml');
    }

    return respond(request, response, 401, JSON.stringify(obj), 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(obj), 'application/json');
};
// 403
const forbidden = (request, response, acceptedTypes) => {
  const obj = createObject('You do not have access to this content', 'forbidden');

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  return respond(request, response, 403, JSON.stringify(obj), 'application/json');
};

// 404
const notFound = (request, response, acceptedTypes) => {
  const obj = createObject('The page you are looking for was not found.', 'notFound');

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  return respond(request, response, 404, JSON.stringify(obj), 'application/json');
};

// 500
const internalError = (request, response, acceptedTypes) => {
  const obj = createObject('Internal Server Error. Something went wrong.', 'internalError');

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  return respond(request, response, 500, JSON.stringify(obj), 'application/json');
};

// 501
const notImplemented = (request, response, acceptedTypes) => {
  const obj = createObject('A get request for this page has not been implemented yet. Check again later for updated content.', 'notImplemented');

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${obj.message}</message>`;
    responseXML = `${responseXML} <id>${obj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  return respond(request, response, 501, JSON.stringify(obj), 'application/json');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
};
