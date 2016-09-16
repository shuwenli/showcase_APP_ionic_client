This Show Case use Ionic2 Framework
1) news pages for SignUp/SignIn(call profile) and testing  secret_token, I just comment the singup/singin.
2) Employee-list page for add people with Scanning, also MQTT is used for receive any update from my "contacts"
3) settings page for drawe pic embeddin in QRcode: JWT is used on server side

How to Run this demo
Step 1: git clone
Step 2: npm install
Step 3a(Web Show): ionic serve(only the first page show since the other 2 page need cordova ready )
Step 3b(Andorid Show): ionic run android(delete platforms/android then re-reun ionic run android if any error)
Step 3c(IOS Show): ionic run ios(delete platforms/android then re-run ionic run ios if nay error)

System:
Cordova CLI: 6.1.1
Ionic Version: 2.0.0-beta.4
Ionic CLI Version: 2.0.0-beta.23
Ionic App Lib Version: 2.0.0-beta.13
ios-deploy version: 1.8.6 
ios-sim version: Not installed
OS: Mac OS X El Capitan
Node Version: v4.3.2
Xcode version: Xcode 7.3.1 Build version 7D1014


Please note it is just Client Side, I commnet some lines to connect servers.
For Server Side:
1) Express.js or other node.js Framework is needed
2) MQTT server is needed
3) User SignUp/SignIn will receive MobileNumber's confirmation code, so Plivo/Twilio's Key/API is needed.

