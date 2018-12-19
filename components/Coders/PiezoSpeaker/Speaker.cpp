#include "Speaker.h"
#include "TimerFreeTone.h"

#include <Arduino.h>

// Constructor :
Speaker::Speaker(const int pin) : m_pin(pin)
{

}

void Speaker::tone(unsigned long frequency, unsigned int duration)
{
    TimerFreeTone(m_pin, frequency, duration);
}

void Speaker::playMelody(unsigned int len, unsigned int *melody, unsigned int *noteDurations)
{
  // Based on https://www.arduino.cc/en/Tutorial/toneMelody
  for (int thisNote = 0; thisNote < len; thisNote++) {
    
	TimerFreeTone(m_pin, melody[thisNote], 1000 / noteDurations[thisNote]); 
	delay(50);
  }
}