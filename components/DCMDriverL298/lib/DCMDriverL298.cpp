#include <Arduino.h>
#include "DCMDriverL298.h"

/**
* Construct a DC Motor Driver instance.<BR>
* It constructs two DC Motor instances, motorL and motorR.<BR>
* enA, enB - enable pins for motors. connected to PWM pin on Arduino board.<BR>
* pinA1,pinA2,pinB1,pinB2 - direction pin of the motors. connected to digital pins on Arduino board.
*/
DCMDriverL298::DCMDriverL298(const int enA, const int pinA1, const int pinA2, const int enB, const int pinB1, const int pinB2) : m_enA(enA), m_enB(enB), m_pinA1(pinA1), m_pinA2(pinA2), m_pinB1(pinB1), m_pinB2(pinB2)
{
	pinMode(m_pinA1,OUTPUT);
    pinMode(m_pinA2,OUTPUT);
    pinMode(m_pinB1,OUTPUT);
    pinMode(m_pinB2,OUTPUT);
    pinMode(m_enA,OUTPUT);
    pinMode(m_enB,OUTPUT);
    
 	stopMotors();
}

/**Set DC motor A speed and direction.
*/
void DCMDriverL298::setMotorA(int speed, bool dir)
{
	setMotor(m_enA, m_pinA1, m_pinA2, speed, dir);
}

/**Set DC motor B speed and direction.
*/
void DCMDriverL298::setMotorB(int speed, bool dir)
{
	setMotor(m_enB, m_pinB1, m_pinB2, speed, dir);
}
/**Stop DC motor A.
*/
void DCMDriverL298::stopMotorA()
{
	off(m_enA, m_pinA1, m_pinA2);
}
/**Stop DC motor B.
*/
void DCMDriverL298::stopMotorB()
{
	off(m_enB, m_pinB1, m_pinB2);
}
/**Stop both DC motors.
*/
void DCMDriverL298::stopMotors()
{
	stopMotorA();
	stopMotorB();
}
/**Set DC motor speed and direction.
*/
void DCMDriverL298::setMotor(int pinPWM, int pinDir1, int pinDir2, int speed, bool dir)
{
	analogWrite(pinPWM, speed);
	digitalWrite(pinDir1, !dir);
	digitalWrite(pinDir2, dir);
}


/**Turn off DC motor
*/
void DCMDriverL298::off(int pinPWM, int pinDir1, int pinDir2)
{
	analogWrite(pinPWM, 0);
	digitalWrite(pinDir1, LOW);
	digitalWrite(pinDir2, LOW);
}