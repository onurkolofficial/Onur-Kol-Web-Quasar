import { LocalStorage } from 'quasar';

import { firebaseFirestore } from 'boot/firebase';
import { collection, getDocs } from 'firebase/firestore';

const redirectUrl = '/404';

const checkForAdminAccount = () => {
  const isUserSignedIn = LocalStorage.has('user');
  const userInfo = LocalStorage.getItem('user');

  if (!isUserSignedIn) {
    window.location.href = redirectUrl;
  } else {
    // Check for Admin Account
    let isAdmin = false;

    const userMail = userInfo.email;

    const usersCollection = collection(firebaseFirestore, 'webAdmin');
    getDocs(usersCollection)
      .then((querySnapshot) => {
        for (var i in querySnapshot.docs) {
          const doc = querySnapshot.docs[i];

          const adminMails = doc.data().email;
          if (adminMails == userMail) {
            isAdmin = true;
            break;
          }
        }

        if (!isAdmin) window.location.href = redirectUrl;
      })
      .catch((error) => {
        // Handle database error
        console.log(error.message);
      });
  }
};

export default checkForAdminAccount;
