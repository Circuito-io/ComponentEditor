#include "Switchable.h"
#include <Arduino.h>

Switchable::Switchable(const int pin) : m_pin(pin)
{
    // Set pin as output
    pinMode(m_pin, OUTPUT);
    // Start state if off
	off();
}

//turn on:
void Switchable::on()
{
	digitalWrite(m_pin, 1); //high
	m_state = true;
}

//turn off:
void Switchable::off()
{
	digitalWrite(m_pin, 0); //low
	m_state = false;
}

void Switchable::toggle()
{
	digitalWrite(m_pin, !m_state); //low
	m_state = !m_state;
}

// dim pin
void Switchable::dim(int dimVal)
{
    analogWrite(m_pin, dimVal);
}
		
bool Switchable::getState()
{
    return m_state;
}

void Switchable::setState(bool state)
{
    digitalWrite(m_pin, state);
    m_state = state;
}



