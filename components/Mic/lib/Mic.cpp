#include "Mic.h"
#include <Arduino.h>

Mic::Mic(const int pin) : m_pin(pin)
{
		
}

int  Mic::read()
{
	return analogRead(m_pin);
}
