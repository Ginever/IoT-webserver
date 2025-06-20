/*********
  Rui Santos & Sara Santos - Random Nerd Tutorials
  Modified from the examples of the Arduino LoRa library
  More resources: https://RandomNerdTutorials.com/esp32-lora-rfm95-transceiver-arduino-ide/
*********/

#include <SPI.h>
#include <LoRa.h>

//define the pins used by the transceiver module
#define ss 5
#define rst 26                                                          
#define dio0 27

//define ultrasound pins
#define trigPin1 25
#define trigPin2 33
#define trigPin3 32
#define echoPin1 35
#define echoPin2 34
#define echoPin3 39

int distance1, distance2, distance3;

void setup() {

  Serial.begin(9600);

  pinMode(trigPin1, OUTPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(echoPin2, INPUT);
  pinMode(echoPin3, INPUT);

  //setup LoRa transceiver module
  LoRa.setPins(ss, rst, dio0);

  while (!LoRa.begin(915E6)) {
    Serial.println(".");
    delay(500);
  }
  // Change sync word (0xF3) to match the receiver
  // The sync word assures you don't get LoRa messages from other LoRa transceivers
  // ranges from 0-0xFF
  LoRa.setSyncWord(0xF3);
  LoRa.setSpreadingFactor(12);
  // LoRa.setTxPower(20);

  Serial.println("Hello world!");

}

void loop() {
  //Read ultrasonic 1
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(5);
 
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
 
  distance1 = pulseIn(echoPin1, HIGH)*0.034/2;

  delayMicroseconds(10);

  //Read ultrasonic 2
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(5);
 
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
 
  distance2 = pulseIn(echoPin2, HIGH)*0.034/2;

  //Read ultrasonic 3
  delayMicroseconds(10);

  digitalWrite(trigPin3, LOW);
  delayMicroseconds(5);
 
  digitalWrite(trigPin3, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin3, LOW);
 
  distance3 = pulseIn(echoPin3, HIGH)*0.034/2;

  // Serial.println(distance1);

  delayMicroseconds(10);

  //Send LoRa packet to receiver
  LoRa.beginPacket();
  LoRa.print(distance1);
  LoRa.print(":");
  LoRa.print(distance2);
  LoRa.print(":");
  LoRa.print(distance3);
  LoRa.endPacket();

  delay(1000);
}