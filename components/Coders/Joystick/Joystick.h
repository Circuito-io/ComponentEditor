/** \addtogroup Joystick 
 *  @{
 */

#ifndef JOYSTICK_H
#define JOYSTICK_H

#include "Joystick.h"
#include "AnalogReader.h"
#include "Button.h"
#include "Arduino.h"

class Joystick 
{
	public:
		Joystick(int pinX, int pinY, int pinSW);
		//get X axis reading
		int getX();
		//get Y axis reading
		int getY();
		//return indication on joystick press
		//The joystick assembly button is '0' when not pressed, so we flip the button logic
		bool getSW();
		
	private:
		int m_pinX, m_pinY, m_pinSW;
		AnalogReader *joyX;
		AnalogReader *joyY;
		Button		 *joySW;
		

};
#endif //JOYSTICK
/** @}*/