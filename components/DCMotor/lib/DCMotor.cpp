#include <Arduino.h>
#include "DCMotor.h"

/**
 * Construct a DC Motor instance 
 */
DCMotor::DCMotor(const int pin) : m_pin(pin)
{
	pinMode(m_pin, OUTPUT);      // sets the digital pin as output	
	off();                       // default state is off
	m_speed = DEFAULT_SPEED;     // set default speed on load
}


/**
 * Turn on DC Motor
 * speed - is a PWM value 0-255 determaining the motor speed 
 */
void DCMotor::on(int speed)
{
	m_speed = speed;
	analogWrite(m_pin, m_speed);
	m_state = true;
}


/**
 * Turn off DC Motor
 */
void DCMotor::off()
{
	digitalWrite(m_pin, 0);
	m_state = false;
}


/**
 * Update DC Motor speed. Can use on() as well
 * speed - is a PWM value 0-255 determaining the motor speed 
 */
void DCMotor::setSpeed(int speed)
{
	m_speed = speed;
	
	// If already running, update pin
	if (m_state)
	{
		analogWrite(m_pin, m_speed);
	}
}	
