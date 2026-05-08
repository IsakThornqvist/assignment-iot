print('hello before utime')
import utime
print('hello')
utime.sleep_ms(200)
print('Sleep Done')

from config import MQTT_BROKER, MQTT_PASSWORD, MQTT_USERNAME
from umqtt.simple import MQTTClient
import ubinascii
import machine
from machine import Pin
import network
import dht
import json

# DHT22 class
class DHT:
    def __init__(self, pin: int):
        self.pin = self.setPin(pin)
        self.sensor = self.setDht(self.pin)

    def setDht(self, pin: Pin):
        return dht.DHT22(pin)

    def setPin(self, pin: int):
        return Pin(pin)

    def measure(self):
        self.sensor.measure()

    def getTemperature(self):
        return self.sensor.temperature()

    def getHumidity(self):
        return self.sensor.humidity()


# Pins
led = Pin(27, Pin.OUT)
dht_sensor = DHT(33)

# WiFi
ssid = 'Wokwi-GUEST'
password = ''

def connect(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while wlan.isconnected() == False:
        print('Waiting for connection...')
        utime.sleep(1)
    print(wlan.ifconfig())

connect(ssid, password)

# Countdown
timeElapsed = 0
while timeElapsed < 5:
    timeElapsed += 1
    print(f"{timeElapsed} out of 5 seconds passed...")
    utime.sleep_ms(1000)

# MQTT config
MQTT_PORT = 8883
MQTT_TOPIC_PUBLISH = b"lnu/iot/it222hp/sensor"
MQTT_TOPIC_SUBSCRIBE = b"lnu/iot/it222hp/command/led"
CLIENT_ID = ubinascii.hexlify(machine.unique_id())

ssl_params = {
    "server_hostname": MQTT_BROKER
}

# LED command callback
def sub_cb(topic, msg):
    print(f'Received on {topic}: {msg.decode()}')
    if topic == MQTT_TOPIC_SUBSCRIBE:
        data = json.loads(msg.decode())
        if data.get("state") == True:
            led.on()
            print("LED ON")
        else:
            led.off()
            print("LED OFF")

# Connect MQTT
mqttClient = MQTTClient(
    CLIENT_ID,
    MQTT_BROKER,
    port=MQTT_PORT,
    user=MQTT_USERNAME.encode("utf-8"),
    password=MQTT_PASSWORD.encode("utf-8"),
    ssl=True,
    ssl_params=ssl_params,
    keepalive=60
)

mqttClient.set_callback(sub_cb)
mqttClient.connect()
mqttClient.subscribe(MQTT_TOPIC_SUBSCRIBE)
print("Connected to MQTT and subscribed")

# Main loop
while True:
    mqttClient.check_msg()

    dht_sensor.measure()
    humidity = dht_sensor.getHumidity()
    temperature = dht_sensor.getTemperature()

    print(f"Temperature: {temperature}°C | Humidity: {humidity}%")

    payload = json.dumps({
        "temperature": temperature,
        "humidity": humidity,
        "timestamp": utime.time()
    })

    mqttClient.publish(
        topic=MQTT_TOPIC_PUBLISH,
        msg=payload.encode(),
        retain=False,
        qos=0
    )

    utime.sleep_ms(5000)