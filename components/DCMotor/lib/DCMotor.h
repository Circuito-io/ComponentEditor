/** \addtogroup DCMotor
 *  @{
 */

#ifndef _DC_MOTOR_H_
#define _DC_MOTOR_H_

const int DEFAULT_SPEED = 200;	//out of 255

//DcMotor driver class:
class DCMotor {

	public:
		DCMotor(const int pin);
		void on(int speed = 250);
		void off();
		void setSpeed(int speed);
	private:
		const int m_pin;
		int m_speed;
		bool m_state;
};

#endif // _DC_MOTOR_H_
/** @}*/