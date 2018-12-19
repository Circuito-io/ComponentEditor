/** \addtogroup DCMotorWDriver
 *  @{
 */

#ifndef _DCMDriverL293D_H_
#define _DCMDriverL293D_H_


//DcMotor driver class:
class DCMDriverL293D 
{

	public:
		DCMDriverL293D(const int enA, const int pinA1, const int pinA2, const int enB, const int pinB1, const int pinB2);
		void setMotorA(int speed, bool dir);
		void setMotorB(int speed, bool dir);
		void stopMotorA();
		void stopMotorB();
		void stopMotors();
		void setMotor(int pinPWM, int pinDir1, int pinDir2, int speed, bool dir);
		void off(int pinPWM, int pinDir1, int pinDir2);
	private:
		const int m_enA, m_enB, m_pinA1, m_pinA2, m_pinB1, m_pinB2;
		
};

#endif // _DCMDriverL293D_H_
/** @}*/