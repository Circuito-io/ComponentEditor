#include "Joystick.h"

/**
* Construct Joystick instance.<BR>
* It consists of two 10Kohm potentiometer and a Pushbutton.<BR>
* pinX, pinY - analog pin on arduino board to read potentiometers.<BR>
* pinSW - digital pin on arduino board to read pushbutton state.
*/
Joystick::Joystick(int pinX, int pinY, int pinSW) : m_pinX(pinX), m_pinY(pinY), m_pinSW(pinSW) 
{
    pinMode(m_pinX,INPUT);
    pinMode(m_pinY,INPUT);
    pinMode(m_pinSW,INPUT_PULLUP);
    
    joyX = new AnalogReader(m_pinX);
    joyY = new AnalogReader(m_pinY);
    joySW = new Button(m_pinSW);
}
/**
*Return X axis value
*/
int Joystick::getX()
{
    return joyX->read();
}

/**
*Return Y axis value
*/
int Joystick::getY()
{
    return joyY->read();
}

/**
* Return indication on joystick press.<BR>
* The joystick assembly button is '0' when not pressed, so we flip the button logic
*/
bool Joystick::getSW()
{
    return !joySW->read();
}
		