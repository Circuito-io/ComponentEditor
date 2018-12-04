#ifndef _VIBRATION_MOTOR_H_
#define _VIBRATION_MOTOR_H_

#include "Switchable.h"

class VibrationMotor : public Switchable  {

	public:
		VibrationMotor(const int pin);
};

#endif // _VIBRATION_MOTOR_H_
 