import firebase_admin
from firebase_admin import credentials
cred = credentials.Certificate('/home/pi/Downloads/delivery-robot-b5a61-firebase-adminsdk-z3fbh-0521e5a427.json')
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://delivery-robot-b5a61-default-rtdb.firebaseio.com/'
})
from firebase_admin import db
ref = db.reference('deliveryrobot/customer info')
data =ref.get()
house_number = data['housenumber']
print(house_number)
shop_name = data['shop']
print(shop_name)

import cv2
import time

# Load the images of the shops and houses
shop1 = cv2.imread('grocery.png')
shop2 = cv2.imread('pharamacy.png')
house1 = cv2.imread('house1.png')
house2 = cv2.imread('house2.png')

# Start the Pi Camera
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Find the matches for the shops and houses
    shop1_matches = cv2.matchTemplate(gray, cv2.cvtColor(shop1, cv2.COLOR_BGR2GRAY), cv2.TM_CCOEFF_NORMED)
    shop2_matches = cv2.matchTemplate(gray, cv2.cvtColor(shop2, cv2.COLOR_BGR2GRAY), cv2.TM_CCOEFF_NORMED)
    house1_matches = cv2.matchTemplate(gray, cv2.cvtColor(house1, cv2.COLOR_BGR2GRAY), cv2.TM_CCOEFF_NORMED)
    house2_matches = cv2.matchTemplate(gray, cv2.cvtColor(house2, cv2.COLOR_BGR2GRAY), cv2.TM_CCOEFF_NORMED)

    # Get the best match for each location
    shop1_best_match = cv2.minMaxLoc(shop1_matches)[3]
    shop2_best_match = cv2.minMaxLoc(shop2_matches)[3]
    house1_best_match = cv2.minMaxLoc(house1_matches)[3]
    house2_best_match = cv2.minMaxLoc(house2_matches)[3]

    # Define the threshold for each match
    threshold = 0.9

    # If the best match for the first shop is above the threshold, stop for a delay
    if ((shop1_best_match[0] > threshold) and (shop_name == Grocery)):
        print("Reached Shop 1")
        time.sleep(10)

    # If the best match for the second shop is above the threshold, stop for a delay
    elif ((shop2_best_match[0] > threshold) and (shop_name == Medicine)):
        print("Reached Shop 2")
        time.sleep(10)

    # If the best match for the first house is above the threshold, stop for a delay
    elif ((house1_best_match[0] > threshold) and (house_number == 1)):
        print("Reached House 1")
        time.sleep(10)

    # If the best match for the second house is above the threshold, stop for a delay
    elif ((house2_best_match[0] > threshold) and (house_number == 2)):
        print("Reached House 2")
        time.sleep(10)
       
import RPi.GPIO as GPIO
import time

# Set up GPIO pins
left_pin = 7
right_pin = 11
left_fwd_pin = 13
left_bwd_pin = 15
right_fwd_pin = 16
right_bwd_pin = 18
obstacle_pin = 22

GPIO.setmode(GPIO.BOARD)
GPIO.setup(left_pin, GPIO.IN)
GPIO.setup(right_pin, GPIO.IN)
GPIO.setup(left_fwd_pin, GPIO.OUT)
GPIO.setup(left_bwd_pin, GPIO.OUT)
GPIO.setup(right_fwd_pin, GPIO.OUT)
GPIO.setup(right_bwd_pin, GPIO.OUT)
GPIO.setup(obstacle_pin, GPIO.IN)

# Helper functions to control the motors
def left_motor_forward():
    GPIO.output(left_fwd_pin, GPIO.HIGH)
    GPIO.output(left_bwd_pin, GPIO.LOW)

def left_motor_backward():
    GPIO.output(left_fwd_pin, GPIO.LOW)
    GPIO.output(left_bwd_pin, GPIO.HIGH)

def right_motor_forward():
    GPIO.output(right_fwd_pin, GPIO.HIGH)
    GPIO.output(right_bwd_pin, GPIO.LOW)

def right_motor_backward():
    GPIO.output(right_fwd_pin, GPIO.LOW)
    GPIO.output(right_bwd_pin, GPIO.HIGH)

# Main loop
while True:
    left_sensor = GPIO.input(left_pin)
    right_sensor = GPIO.input(right_pin)
    obstacle_sensor = GPIO.input(obstacle_pin)

    # If there is an obstacle, turn left
    if obstacle_sensor == 1:
        left_motor_backward()
        right_motor_forward()
        time.sleep(0.5)
    else:
        # Follow the line using the left and right sensors
        if left_sensor == 1 and right_sensor == 1:
            left_motor_forward()
            right_motor_forward()
        elif left_sensor == 1 and right_sensor == 0:
            left_motor_forward()
            right_motor_backward()
        elif left_sensor == 0 and right_sensor == 1:
            left_motor_backward()
            right_motor_forward()
        else:
            left_motor_backward()
            right_motor_backward()

    # Sleep for a short time to avoid overloading the motors
    time.sleep(0.05)

    # Display the frame
    cv2.imshow('frame',frame)

    # Exit if the 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and destroy all windows
cap.release()
cv2.destroyAllWindows()
