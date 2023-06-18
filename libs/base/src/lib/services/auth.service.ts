import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
/*******************************************
 * Temporary Models
 ********************************************/

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Action, AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';

import { Observable, Observer, Subscription } from 'rxjs';
import { User, UserInfo } from "../model/User";
import { CollectionService } from "../impl/CollectionService";
import { LOGIN_IN_PROGRESS_KEY } from "../../../../../apps/admin/src/app/admin-const";
import { NotificationService } from "./notificationService";
import { MatDialog } from "@angular/material/dialog";
import { LinkAccountDialog } from "../component/link-account-dialog/link-account-dialog";
import firebase from "firebase/compat/app";
import auth = firebase.auth;
import { IdTokenResult } from '../../../../../functions/node_modules/@firebase/auth-types/index.d';



@Injectable({
  providedIn: "root", //todo check root or base module
}
)
export class AuthService extends CollectionService<User> {

  public static userAccessLevels = {
    super_admin: 60,
    admin: 50,
    organization_admin: 40,
    facilitator: 34,
    teacher: 30,
    student: 20
  }

  private isSignedOut: boolean = false; // In order to prevent user re-login during sign-out
  private _cachedDbuser: User; // Cached instance in order to prevent multiple doc retrieval for current user. Use getCurrentDbUser() to get current user.
  // private authUserTokenLSKey = "firestore_auth_user_token_state_firestore";
  private userSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private http: HttpClient,
    private notificationService: NotificationService, public dialog: MatDialog) {
    super("users", afs);
    console.log("AuthService Init...");

    // if (this.authUserTokenLSKey in localStorage) {
    //   const currentAuthUserInfo = localStorage.getItem(this.authUserTokenLSKey);
    //   this.getAuthUserTokenVerification(JSON.parse(currentAuthUserInfo)).subscribe(authTokenInfo => {
    //     if (authTokenInfo['verified']) {
    //       this.signinAuthUserFromToken(authTokenInfo);
    //     }
    //   })
    // }
  }

  public isUserLoggedIn (): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.handleAuthClaims().subscribe(idTokenResult => {
        if (idTokenResult != null) {
          this.getCurrentDbUser().subscribe(dbUser => {
            if (dbUser != null) {
              resolve(true);
            } else {
              resolve(false)
            }
          })
        } else {
          resolve(false)
        }
      }, error => resolve(false)) 
    })
  }

  private hashedPassword (password): string {
    return password
  }

  getAuthTokenInfo (): Promise<any> {
    return firebase.auth().currentUser.getIdTokenResult();
  }

  /**
   * Create firebase auth entry
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<string>}
   */
  createFirestoreseUser (user: User): Observable<string> {
    return new Observable<string>(observer => {
      user.email = user.email.toLowerCase();
      user.id = user.email;
      this.getPromised(user.email).then(value => {
        if (value == null) {
          this.addWithId(user).then(result => {
            observer.next("User is created");
          }, error => {
            console.error(error);
            observer.error(error);
          })
        } else {
          observer.error("User with " + user.email + " is exists.");
        }
      }, error => {
        observer.error("Error checking user information.contact administrator");
      })
    });
  }

  /**
   * Update firestore user information
   *
   * @param {User} user
   * @returns {Observable<string>}
   */
  updateFirestoreUser (user: User): Observable<string> {
    return new Observable(observer => {
      this.afs.collection("users").doc(user.email).update(user).then(result => {
        observer.next("User is updated");
        observer.complete()
      }, error => {
        console.error(error);
        observer.error(error);
      })
    });
  }

  /**
   * Update firebase auth password
   *
   * @param {User} user
   * @returns {Observable<string>}
   * @deprecated will be removed
   */
  updateFirebaseAuthLoginPassword (email: string, oldPassword: string, newPassword: string): Observable<string> {
    return new Observable(observer => {
      this.afAuth.signInWithEmailAndPassword(email, this.hashedPassword(oldPassword)).then(result => {
        this.afAuth.currentUser.then(currentUser => {
          currentUser.updatePassword(this.hashedPassword(newPassword)).then(value => {
            this.afAuth.updateCurrentUser(currentUser).then(updateCurrentUserResult => {
              console.log("Password updated successfully");
              observer.next("Password update success");
              observer.complete();
            }, error => {
              console.error(error);
              observer.error("An error occurred while updating password");
            })
          }).catch(error => {
            console.error(error);
            observer.error("Password update failed!");
          })
        }).catch(error => {
          console.error(error);
          observer.error("Password update failed!");
        })
      }, error => {
        console.error(error);
        observer.error("Password update failed!");
      });
    });
  };

  /**
   * Update firebase auth password with logged in user
   *
   * @param newPassword
   * @returns {Observable<string>}
   */
  updateFirebaseAuthProfilePassword (newPassword: string): Observable<Object> {

    return new Observable(observer => {

      this.afAuth.currentUser.then(currentFirebaseUser => {

        currentFirebaseUser.updatePassword(this.hashedPassword(newPassword)).then(() => {
          this.afAuth.updateCurrentUser(currentFirebaseUser).then(() => {
            observer.next({ message: 'Profile update', status: 'Success' });
            observer.complete();
          }, error => {
            console.error(error);
            observer.error({ message: 'Profile update', status: 'Failed' });
          })
        }, error => {
          console.error(error);
          observer.error({ message: 'Profile update', status: 'Failed' });
        });
      }).catch(error => {
        console.error(error);
        observer.error({ message: 'User Fetch update', status: 'Failed' });
      })
    });
  };


  /**
   * Reset user password to default value through a CF
   *
   * @param userData
   * @returns {Observable<Object>}
   */
  resetUserPasswordToDefault (userData, passwordResetUrl) {
    return this.http.post(passwordResetUrl, userData);
  }

  /**
   * Login with an email and password
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<string>}
   */
  emailLogin (email: string, password: string): Observable<string> {
    return new Observable<string>(observer => {
      this.afAuth
        .signInWithEmailAndPassword(email, this.hashedPassword(password))
        .then(credential => {
          console.log(email + " authentication success!"); 
          this.handleAuthClaims().subscribe(() => {
            observer.next("Getting your profile ready. Please wait...");
            this.checkUserAuthorization(email, observer, false, false, null);
          }, e => observer.error(e));
        })
        .catch(error => {
          console.error(error);
          observer.error(this.getMessageError(error));
        });
    });
  }

  public handleAuthClaims (): Observable<auth.IdTokenResult> {
    return new Observable<auth.IdTokenResult>(observer => {
      this.afAuth.idTokenResult.subscribe(idTokenResult => {
        if(idTokenResult == null){
          observer.error("Login error occurred.Contact your administrator or try a different login method.");
        }else if (idTokenResult?.claims?.accessLevel > AuthService.userAccessLevels.student) {
          observer.next(idTokenResult);
          observer.complete();
        } else {
          observer.error("Sorry! You don't have permissions to access this portal");
        }
      }, e => observer.error(e));
    });
  }

  /**
   * OAuth logins.  Please note that google OAuth login behavior is differnt from rest of the OAuth providers.
   *  Ex: P -> password login, G -> Google login, F -> Facebook login, () -> Auth providers of the account after login
   *      Case 1: P (P), G (PG), G (PG), F (PGF), F(PGF), G(PGF)
   *      Case 2: P (P), F (PF), F (PF), G (PG)*, G(PG), F(PGF), F(PGF), G(PGF)
   *
   * @param {string} providerString
   * @returns {Observable<string>}
   */
   public oAuthLogin (providerString: string): Observable<string> {
    let provider;
    if (providerString === 'Google') {
      provider = new auth.GoogleAuthProvider();
    } else if (providerString === 'Facebook') {
      provider = new auth.FacebookAuthProvider();
    } else if (providerString === 'GitHub') {
      provider = new auth.GithubAuthProvider();
    } else if (providerString === 'Twitter') {
      provider = new auth.TwitterAuthProvider();
    }

    // Set login in progress key to local storage
    localStorage.setItem(LOGIN_IN_PROGRESS_KEY, "true");

    return new Observable( observer => {
      observer.next("Redirecting to " + providerString + " login. Please wait...");
      this.afAuth.signInWithRedirect(provider)
        .then(() => observer.next("Redirect successful"))
        .catch((error) => observer.error(error));
    });
  }

  public proceedWithInProgressLogin (): Observable<string> {
    return new Observable(observer => {
      if (!this.isSignedOut) {
  
        // authState will emit a value immediately upon subscription. This value will be the current user if logged in, or null if not logged in.
        this.afAuth.authState.subscribe(user => {
          // If the user is logged in
          if (user) {
            this.handleAuthClaims().subscribe(() => {
              observer.next("Getting your profile ready. Please wait...");
              let checkLinking = false;
              let googleLinking = false;
              if (user.providerData.length === 1) {
                checkLinking = true;
                const providerId = user.providerData[0].providerId;
                if (providerId === 'google.com') {
                  googleLinking = true;
                }
              }
              //this.afAuth.setPersistence(firebase.Auth.Persistence.NONE);
              this.checkUserAuthorization(user.email, observer, checkLinking, googleLinking, null);
            }, e => {
              observer.error(e);
            })
          } else {
            // No user was logged in
            console.error("User authentication failed!");
            observer.error("");
          }
        }, error => {
          // Error handling
          if (error.code === "auth/account-exists-with-different-credential") { // https://github.com/firebase/firebase-js-sdk/issues/301
            this.handleAuthClaims().subscribe(() => {
              observer.next("Getting your profile ready. Please wait...");
              this.checkUserAuthorization(error.email, observer, true, false, error.credential);
            }, e => observer.error(e))
          } else if (error.code === "auth/user-token-expired") {
            observer.error("Your login credential has expired. Please re-login by refreshing this window.");
            console.error("auth/user-token-expired: This may be due to user was removed from auth!")
          } else {
            console.error(error.email + " authentication failed!");
            console.error(error);
            observer.error(this.getMessageError(error));
          }
        });
      }
    });
  }
  

  /**
   * Retrieve user from firstore. If found, login to system.
   * If this is called by a OAuth login and there exists an email/password link, link the OAuth login with email/password login.
   * Note: Firebase authentication setting must be "One account per email address".
   *
   * @param userId
   * @param observer
   */
  private checkUserAuthorization (userId: string, observer: Observer<string>, checkLinking, isGoogleLinking, linkingCredential) {

    this.get(userId.toLowerCase()).subscribe(authDoc => {
      if (authDoc === undefined) {
        // User is not found
        console.error(userId + " not found!");
        observer.error("You are not signed-up with Satipasala. Please contact your local administrator.");
        this.signOutWithoutReload();
      } else {
        // User does exist in DB
        if (authDoc.disabled) {
          // Do not stop here even if user is disabled. If OAuth login is in progress for the first time, then linking in below is mandatory.
          observer.error("User account is inactive. Please contact your local administrator.");
          this.signOutWithoutReload();
        } else {
          observer.next("Welcome " + authDoc.email + " to Sati Pasala!");
        }

        // Check whether any account linking is required. (Not required for email/password login)
        if (checkLinking) {
          // Linking
          if (isGoogleLinking) { // https://github.com/firebase/firebase-js-sdk/issues/301

            this.openLinkAccountsDialog(authDoc).then(password => {
              const credential = firebase.auth.EmailAuthProvider.credential(authDoc.email, password);

              this.afAuth.currentUser.then(currentUser => {
                currentUser.linkWithCredential(credential).then(value => {
                  console.log("Google account linking success");
                  // Success path -> LOGIN completed with linking two Auth logins
                  this.notificationService.showSuccessNotification("Account linking success.")
                  observer.complete();
                }).catch(error => {
                  if (error.code === "auth/user-token-expired") {
                    observer.error("Your login credential has expired. Please re-login by refreshing this window.");
                    console.error("auth/user-token-expired: This may be due to user was removed from auth!");
                    this.signOutWithoutReload();
                  } else {
                    console.log("Account linking error:" + error.code);
                    observer.error("NAccount linking error:" + error.code);
                    this.signOut().then(value => {
                      this.notificationService.showErrorNotification("Account linking error:" + error.code)
                    });

                  }
                })
              });
            })


          } else {

            this.openLinkAccountsDialog(authDoc).then(password => {
              this.afAuth.signInWithEmailAndPassword(authDoc.email, this.hashedPassword(password)).then(result => {
                result.user.linkWithCredential(linkingCredential).then(value => {
                  // Success path -> LOGIN completed with linking two Auth logins
                  this.notificationService.showSuccessNotification("Account linking success");
                  observer.complete();
                }).catch(reason => {
                  console.error("credential linking failed");
                  observer.error("credential linking failed");
                  this.signOutWithoutReload();
                });

              }, siginInError => {
                console.log("Account linking error:" + siginInError);
                observer.error("NAccount linking error:" + siginInError);
                this.signOut().then(value => this.notificationService.showSuccessNotification("Account linking error:" + siginInError));
              });
            })

          }
        } else {
          // Success path -> LOGIN complete for email/password login
          this.navigateToMainIfActive(authDoc);
          observer.complete();
        }
      }
    }, error => {
      // DB error! User is not found
      console.error(error);
      observer.error("Your account is not registered yet...Please contact the administrate to create one.");
      this.signOutWithoutReload();
    });

  }

  /**
   * Check whether user is active (Auth Document), and navigate to main window.
   * @param authUser
   */
  private navigateToMainIfActive (authUser: User) {
    if (authUser.disabled) {
      console.log("User is disabled in firestore");
    } else {
      this.router.navigate(['/']);
    }
  }

  public signOutWithoutReload () {
    this.afAuth.signOut().then(() => {
      this.isSignedOut = true;
      this._cachedDbuser = null;
      localStorage.clear();
    });
  }

  /**
   * Signout from the system
   */
  public signOut (): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      this.userSubscription.unsubscribe();
      this.afAuth.signOut().then(() => {
        this.isSignedOut = true;
        this._cachedDbuser = null;
        localStorage.clear();
        this.router.navigateByUrl("/login").then(value => {
          resolve(true)
        }).catch(reason => resolve(true))

      }).catch(reason => {
        reject(reason)
      });
    })

  }


  private accessUserData (userInfo: UserInfo) {
    const userRef = this.afs.collection("users").doc(userInfo.email);
    return userRef.get();
  }

  /**
   * Get currently logged in Auth user (Firebase)
   *
   * @returns {firebase.UserInfo}
   */
  public async getCurrentAuthUser (): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  /**
   * Get currently logged in Firestore User Doc. Subscribe for user changes and keep the cached instance updated with changes.
   * This will limit number of document reads for current user.
   *
   * @returns {Observable<User>}
   */
  public getCurrentDbUser (): Observable<User> {
    return new Observable<User>(observer => {
      if (this._cachedDbuser) {
        console.log('**********Cached current user : ' + this._cachedDbuser.email);
        observer.next(this._cachedDbuser);
        observer.complete();
      } else {
        this.getCurrentAuthUser().then(currentDbUser => {
          this.userSubscription = this.afs.collection<User>("users").doc(currentDbUser.email).snapshotChanges().subscribe(snapshot => {
            const dbUser = snapshot.payload.data() as User;
            this._cachedDbuser = dbUser;
            console.log('**********New read for current user : ' + dbUser.email);
            // this.getAuthTokenInfo().then(tokenInfo => {
            //   const authUserTokenInfo: {} = {
            //     token: tokenInfo.token,
            //     uid: tokenInfo.email
            //   };
            //   localStorage.setItem(this.authUserTokenLSKey, JSON.stringify(authUserTokenInfo));
            // }).catch(error => {
            //   this.notificationService.showErrorNotification("Auth token fetch." + error);
            // });
            observer.next(dbUser);
            observer.complete();
          }, error => {
            // Exception thrown when logging user out
            this.notificationService.showErrorNotification("Reading logged in user info." + error)
            observer.error(error);
          }
          );

        }).catch(reason => {
          this.notificationService.showErrorNotification("Reading logged in user info." + reason)
          observer.error(reason);
        })

      }
    });
  }

  getMessageError (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return "Email format shoud be as name@example.com";
      case "auth/wrong-password":
        return "Your email and/or password do not match";
      case "auth/user-not-found":
        return "Your email and/or password do not match";
      default:
        return "Oops! Login failed. Please try again.";
    }
  }


  openLinkAccountsDialog (user: User): Promise<string> {
    return new Promise<string>(resolve => {
      const dialogRef = this.dialog.open(LinkAccountDialog, {
        width: '350px',
        // height: '35%',
        data: { user: user }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          resolve(result)
        } else {
          this.signOut()
        }
      }, error => {
        this.notificationService.showErrorNotification("Error", error)
      });
    })

  }

}
