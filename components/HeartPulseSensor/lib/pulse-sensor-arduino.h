/*
>> pulse-sensor-arduino.h <<

A simple library for using the heart rate pulse sensor in an Arduino Yún board (may be used in other boards too). 
Reference: https://github.com/WorldFamousElectronics/PulseSensor-Amped-Leonardo

This code is for Pulse Sensor Amped by Joel Murphy and Yury Gitman
    www.pulsesensor.com 
    >>> Pulse Sensor purple wire goes to Analog Pin 0 <<<
Pulse Sensor sample aquisition and processing happens in the background via Timer 1 interrupt. 2ms sample rate.

The following variables are automatically updated:
Signal :    int that holds the analog signal data straight from the sensor. updated every 2ms.
IBI  :      int that holds the time interval between beats. 2mS resolution.
BPM  :      int that holds the heart rate value, derived every beat, from averaging previous 10 IBI values.
QS  :       boolean that is made true whenever Pulse is found and BPM is updated. User must reset.
*/

#ifndef PULSE_SENSOR_ARDUINO_H
#define PULSE_SENSOR_ARDUINO_H

#include "Arduino.h"

class PulseSensor
{
public:
  static void begin(int pulsePin);

  static volatile int BPM;           // used to hold the pulse rate
  static volatile int Signal;        // holds the incoming raw data
  static volatile int IBI;           // holds the time between beats, must be seeded!
  static volatile boolean QS;        // becomes true when Arduoino finds a beat.
};

#endif // PULSE_SENSOR_ARDUINO_H