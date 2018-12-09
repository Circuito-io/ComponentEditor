#ifndef _MIC_H_
#define _MIC_H_

class Mic
{

	public:
		Mic(const int pin);
		int read();

	private:
		const int m_pin;

};

#endif // _MIC_H_
