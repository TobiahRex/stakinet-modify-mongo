import { Promise as bbPromise } from 'bluebird';

/**
* 1) Dynamically create, update, or delete Documents on Mongo Collections.
*
* @param {object} event - Lambda event object.
* - Keys: operationName, collectionName, {other Args for operation.}
* @param {object} <Collections> - Mongo Collections containing documents to be mutated or created.
*
* @return {object} modified Document - Promises: resolved.
*/

export default ({ event, dbModels }) =>
new Promise((resolve, reject) => {
  console.log('\nSTART: Handling modification... ',
  '\noperationName: ', event.body.operationName,
  '\ncollectionName: ', event.body.collectionName,
  '\n\ndbModels: ', Object.keys(dbModels));

  const { operationName, collectionName } = event.body;
  console.log('event: ', event);

  switch (operationName) {
    case 'dropCollection': {
      return dbModels[collectionName]
      .dropCollection()
      .then(resolve)
      .catch(reject);
    }

    case 'removeOne': {
      return dbModels[collectionName]
      .removeOne(event.body)
      .then(resolve)
      .catch(reject);
    }

    case 'updateDoc': {
      return dbModels[collectionName]
      .updateDoc(event.body)
      .then(resolve)
      .catch(reject);
    }

    case 'createDoc': {
      return dbModels[collectionName]
      .createDoc(event.body)
      .then(resolve)
      .catch(reject);
    }

    case 'fetchAll': {
      return dbModels[collectionName]
      .find({})
      .exec()
      .then(resolve)
      .catch(reject);
    }

    case 'fetchDoc': {
      return dbModels[collectionName]
      .find({})
      .exec()
      .then(resolve)
      .catch(reject);
    }

    default: {
      console.log('\n\nNo operation executed.  Verify input arguments.');
      reject('No operation executed.  Verify input arguments.');
    }
  }
  reject(`operationName: ${operationName} does not exist.`);
});
