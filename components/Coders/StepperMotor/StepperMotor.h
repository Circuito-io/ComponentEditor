#ifndef StepperMotor_H
#define StepperMotor_H

#include <Arduino.h>

class StepperMotor
{
	public:
		StepperMotor(int stepPin, int dirPin);
		void step(byte dir, int numberOfSteps);
    void setStepDelay(int stepDelay);
		void enable();
		void disable();
		
	private:
		const int m_stepPin,m_dirPin;
		byte m_enableStatus = 0;
		int m_stepDelay = 1000;
};
#endif //StepperMotor_H
