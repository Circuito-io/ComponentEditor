#include "StepperMotor.h"

StepperMotor::StepperMotor(int stepPin, int dirPin) : m_stepPin(stepPin), m_dirPin(dirPin)
{
	pinMode(m_stepPin, OUTPUT);
	pinMode(m_dirPin, OUTPUT);
  disable();
}

// move the motor, this function is blocking
void StepperMotor::step(byte dir, int numberOfSteps)
{
	if(!m_enableStatus) //if motor isn't enabled don't do anything
		return;
	digitalWrite(m_dirPin, dir); //define the direction

    
	for(int i=0;i<numberOfSteps;i++) //each loop is one step
	{
		digitalWrite(m_stepPin,HIGH);
		delayMicroseconds (m_stepDelay); 	
		digitalWrite(m_stepPin,LOW);
		delayMicroseconds (m_stepDelay);
	}
}

// set motor speed, the motor speed has an invert relation with the step delay
void StepperMotor::setStepDelay(int stepDelay)
{
  m_stepDelay = stepDelay / 2;
}

// enable stepper motor
void StepperMotor::enable()
{
  m_enableStatus = 1;
}

// disable stepper motor
void StepperMotor::disable()
{
  m_enableStatus = 0;
}
