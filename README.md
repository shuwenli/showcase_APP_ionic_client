This Show Case use Ionic2 Framework



1) news pages for SignUp/SignIn(call profile) and testing  secret_token, I just comment the singup/singin.

2) Employee-list page for add people with Scanning, also MQTT is used for receive any update from my "contacts"

3) settings page for drawe pic embeddin in QRcode: JWT is used on server side


Please note it is just Client Side, I commnet some lines to connect servers.

For Server Side:
1) Express.js or other node.js Framework is needed
2) MQTT server is needed
3) User SignUp/SignIn will receive MobileNumber's confirmation code, so Plivo/Twilio's Key/API is needed.

