import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Adds a message that welcomes new users into the system
export const authUserOnDelete = functions.auth.user().onDelete((user) => {
  console.log('User - '+user.email + ' is deleted.');
  const fullName = user.displayName || 'Anonymous';

  // Saves the new welcome message into the database
  // which then displays it in the FriendlyChat clients.
  return admin.database().ref('messages').push({
    name: 'Firebase Bot',
    photoUrl: '/assets/images/firebase-logo.png', // Firebase logo
    text: `${fullName} is deleted!`
  });
});
