
import { empty, of } from "rxjs";

const mockedCollection = jest.fn(() => {
  return {
    doc: jest.fn(() => {
      return {
        collection: mockedCollection,
        update: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
        get: jest.fn(() => Promise.resolve(true))
      }
    }),
    where: jest.fn(() => {
      return {
        get: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
      }
    }),
    snapshotChanges:jest.fn(() => of({}))
  }
});

export const MockFireStore = {
    collection: mockedCollection
}

export class MockedFirebase {

  static initializeApp = jest.fn();

  static auth = jest.fn(() => {
    return {
      createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
      sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
      signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
      fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
      signOut: jest.fn(() => Promise.resolve(true)),
      onAuthStateChanged: jest.fn(),
      currentUser: {
        sendEmailVerification: jest.fn(() => Promise.resolve(true))
      }
    }
  });

  static firestore = MockFireStore;

  static notifications = jest.fn(() => {
    return {
      onNotification: jest.fn(),
      onNotificationDisplayed: jest.fn(),
      onNotificationOpened: jest.fn()
    }
  });

  static messaging = jest.fn(() => {
    return {
      hasPermission: jest.fn(() => Promise.resolve(true)),
      subscribeToTopic: jest.fn(),
      unsubscribeFromTopic: jest.fn(),
      requestPermission: jest.fn(() => Promise.resolve(true)),
      getToken: jest.fn(() => Promise.resolve('RN-Firebase-Token'))
    }
  });

  static storage = jest.fn(() => {
    return {
      ref: jest.fn(() => {
        return {
          child: jest.fn(() => {
            return {
              put: jest.fn(() => Promise.resolve(true))
            }
          })
        }
      })
    }
  })

}
