import datetime
import serial
from pyrebase import pyrebase
from twilio.rest import Client

# serial port settings for mucro:bit to Windows pc usb
ser = serial.Serial()
ser.baudrate = 115200
ser.port = "COM4"
ser.open()
today = datetime.datetime.now()
date_time = today.strftime("%m/%d/%Y, %H:%M:%S")
# unique user hardcoded on remote pc connected to sensor - hardcoded onto every users' alarm systems
user = "john_doe@gmail.com"

# firebase config
config = {
    "apiKey": "AIzaSyDuiGROW-6eI6jUcwB7yxrbuPk3Wp16_dk",
    "authDomain": "cs-coursework-website-database.firebaseapp.com",
    "databaseURL": "https://cs-coursework-website-database-default-rtdb.europe-west1.firebasedatabase.app",
    "storageBucket": "cs-coursework-website-database.appspot.com",
}

# cleaning the data captured via serial port from micro:bit
while True:
    data1 = str(ser.readline())
    data1 = data1.replace("b", "")
    data1 = data1.replace("'", "")
    data1 = data1.replace("\\r\\n", "")
    data1 = data1.rstrip()

    # if data is not empty send add it to firebase realtime db
    if data1 is not None:
        data_entry = data1.split(",")
        # unique user hardcoded on remote pc connected to sensor
        user = "john_doe@gmail.com"
        status = data_entry[1]
        value = {"user": user, "status": status, "date_time": date_time}
        #print(value)
        firebase = pyrebase.initialize_app(config)
        db = firebase.database()

        # try catch in case issues connecting to firebase
        try:
            db.child("users").set(value)
            #print('Transaction completed')
        except db.TransactionAbortedError:
            #print('Transaction failed to commit')

        if data_entry[1] == "Alarm triggered":  # if alert was triggered send SMS via Twilio service to phone
            # twilio config
            #print("Alert was triggered")
            account_sid = 'AC58a289c9685b08e3a197b29d52019666'
            auth_token = '2daef5d63b052e32946447dd04cf0b33'
            client = Client(account_sid, auth_token)

            message = client.messages \
                .create(
                body='Alert was triggered from your microbit device',
                from_='+12399325135',
                to='+353894231154'
            )

            #print(message.sid)
