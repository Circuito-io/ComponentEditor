/*
>> pulse-sensor-arduino.cpp <<

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

#include "pulse-sensor-arduino.h"

volatile int rate[10];                        // array to hold last ten IBI values
volatile unsigned long sampleCounter = 0;     // used to determine pulse timing
volatile unsigned long lastBeatTime = 0;      // used to find IBI
volatile int P =512;                          // used to find peak in pulse wave, seeded
volatile int T = 512;                         // used to find trough in pulse wave, seeded
volatile int thresh = 512;                    // used to find instant moment of heart beat, seeded
volatile int amp = 100;                       // used to hold amplitude of pulse waveform, seeded
volatile boolean firstBeat = true;            // used to seed rate array so we startup with reasonable BPM
volatile boolean secondBeat = false;          // used to seed rate array so we startup with reasonable BPM
volatile boolean Pulse = false;               // true when pulse wave is high, false when it's low
volatile int pulsePin;

volatile int PulseSensor::IBI = 600;          // holds the time between beats, must be seeded!
volatile int PulseSensor::BPM;                // used to hold the pulse rate
volatile int PulseSensor::Signal;             // holds the incoming raw data
volatile boolean PulseSensor::QS = false;     // becomes true when Arduino finds a beat

void PulseSensor::begin(int pPin)
{
  pinMode(pulsePin, INPUT);
  pulsePin = pPin;

  // Initializes Timer1 to throw an interrupt every 2ms.
  TCCR1A = 0x00;
  TCCR1B = 0x0C;  // CTC (Compare match mode) and ClockIO/256
  OCR1A = 0x7C;   // 2 ms
  TIMSK1 = 0x02;
  sei();             // MAKE SURE GLOBAL INTERRUPTS ARE ENABLED
}

// THIS IS THE TIMER 1 INTERRUPT SERVICE ROUTINE. 
// Timer 1 makes sure that we take a reading every 2 miliseconds
ISR(TIMER1_COMPA_vect)
{                         // triggered when Timer1 counts to 124
  cli();                                      // disable interrupts while we do this
  PulseSensor::Signal = analogRead(pulsePin);              // read the Pulse Sensor 
  sampleCounter += 2;                         // keep track of the time in ms with this variable
  int N = sampleCounter - lastBeatTime;       // monitor the time since the last beat to avoid noise

  //  find the peak and trough of the pulse wave
  if(PulseSensor::Signal < thresh && N > (PulseSensor::IBI/5)*3){       // avoid dichrotic noise by waiting 3/5 of last IBI
    if (PulseSensor::Signal < T){                        // T is the trough
      T = PulseSensor::Signal;                         // keep track of lowest point in pulse wave 
    }
  }

  if(PulseSensor::Signal > thresh && PulseSensor::Signal > P){          // thresh condition helps avoid noise
    P = PulseSensor::Signal;                             // P is the peak
  }                                        // keep track of highest point in pulse wave

  //  NOW IT'S TIME TO LOOK FOR THE HEART BEAT
  // signal surges up in value every time there is a pulse
  if (N > 250){                                   // avoid high frequency noise
    if ( (PulseSensor::Signal > thresh) && (Pulse == false) && (N > (PulseSensor::IBI/5)*3) )
    {        
      Pulse = true;                               // set the Pulse flag when we think there is a pulse
      PulseSensor::IBI = sampleCounter - lastBeatTime;         // measure time between beats in mS
      lastBeatTime = sampleCounter;               // keep track of time for next pulse

      if(secondBeat){                        // if this is the second beat, if secondBeat == TRUE
        secondBeat = false;                  // clear secondBeat flag
        for(int i=0; i<=9; i++){             // seed the running total to get a realisitic BPM at startup
          rate[i] = PulseSensor::IBI;                      
        }
      }

      if(firstBeat){                         // if it's the first time we found a beat, if firstBeat == TRUE
        firstBeat = false;                   // clear firstBeat flag
        secondBeat = true;                   // set the second beat flag
        sei();                               // enable interrupts again
        return;                              // IBI value is unreliable so discard it
      }   


      // keep a running total of the last 10 IBI values
      word runningTotal = 0;                  // clear the runningTotal variable    

      for(int i=0; i<=8; i++){                // shift data in the rate array
        rate[i] = rate[i+1];                  // and drop the oldest IBI value 
        runningTotal += rate[i];              // add up the 9 oldest IBI values
      }

      rate[9] = PulseSensor::IBI;                          // add the latest IBI to the rate array
      runningTotal += rate[9];                // add the latest IBI to runningTotal
      runningTotal /= 10;                     // average the last 10 IBI values 
      PulseSensor::BPM = 60000/runningTotal;               // how many beats can fit into a minute? that's BPM!
      PulseSensor::QS = true;                              // set Quantified Self flag 
      // QS FLAG IS NOT CLEARED INSIDE THIS ISR
    }                       
  }

  if (PulseSensor::Signal < thresh && Pulse == true){   // when the values are going down, the beat is over
    Pulse = false;                         // reset the Pulse flag so we can do it again
    amp = P - T;                           // get amplitude of the pulse wave
    thresh = amp/2 + T;                    // set thresh at 50% of the amplitude
    P = thresh;                            // reset these for next time
    T = thresh;
  }

  if (N > 2500){                           // if 2.5 seconds go by without a beat
    thresh = 512;                          // set thresh default
    P = 512;                               // set P default
    T = 512;                               // set T default
    lastBeatTime = sampleCounter;          // bring the lastBeatTime up to date        
    firstBeat = true;                      // set these to avoid noise
    secondBeat = false;                    // when we get the heartbeat back
  }

  sei();                                   // enable interrupts when youre done!
} // end isr
