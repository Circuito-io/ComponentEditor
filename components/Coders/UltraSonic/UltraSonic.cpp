#include "UltraSonic.h"
#include <Arduino.h>

// Constructor :
UltraSonic::UltraSonic(const int PWMPin) : m_PWMPin(PWMPin)
{
	pinMode(m_PWMPin, INPUT);      // sets the digital pin as input
}

// read UltraSonic value
float  UltraSonic::getInches()
{
	float inches;
	unsigned long duration;

	duration = pulseIn(m_PWMPin, HIGH);
	inches = duration / 147; //147uS per inch
	
	return inches;        
}

float  UltraSonic::getCms()
{
	return UltraSonic::getInches() * 2.54; //return value in cm       
}

float  UltraSonic::read()
{
	return UltraSonic::getInches() * 2.54; //return value in cm       
}
