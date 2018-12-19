#include "Button.h"

#include <Arduino.h>


Button::Button(const int pin) : m_pin(pin)
{

}

void Button::init()
{

  pinMode(m_pin, INPUT);
  // set begin state
  m_lastButtonState = read();
}


//read button state.
bool Button::read()
{
  return digitalRead(m_pin);

}


//In General:
//if button is not pushed function will return LOW (0).
//if it is pushed function will return HIGH (1).

bool Button::onChange()
{
  //read button state. '1' is pushed, '0' is not pushed.
  bool reading = read();
  // If the switch changed, due to noise or pressing:
  if (reading != m_lastButtonState) {
    // reset the debouncing timer
    m_lastDebounceTime = millis();
    m_pressFlag = 1;
  }

  if ((millis() - m_lastDebounceTime) > m_debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (m_pressFlag) { //reading != m_lastButtonState) {
      //update the buton state
      m_pressFlag = 0;

      // save the reading.  Next time through the loop,
      m_lastButtonState = reading;
      return 1;

    }
  }
  m_lastButtonState = reading;

  return 0;

}

bool Button::onPress()
{
  //read button state. '1' is pushed, '0' is not pushed.
  bool reading = read();
  // If the switch changed, due to noise or pressing:
  if (reading == HIGH && m_lastButtonState == LOW) {
    // reset the debouncing timer
    m_lastDebounceTime = millis();
    m_pressFlag = 1;
  }

  if ((millis() - m_lastDebounceTime) > m_debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (m_pressFlag) {
      // save the reading.  Next time through the loop,
      m_pressFlag = 0;
      m_lastButtonState = reading;
      return 1;

    }
  }
  m_lastButtonState = reading;

  return 0;

}

bool Button::onRelease()
{
  //read button state. '1' is pushed, '0' is not pushed.
  bool reading = read();
  // If the switch changed, due to noise or pressing:
  if (reading == LOW && m_lastButtonState == HIGH) {
    // reset the debouncing timer
    m_lastDebounceTime = millis();
    m_pressFlag = 1;
  }

  if ((millis() - m_lastDebounceTime) > m_debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if ( m_pressFlag) { //reading == LOW && m_lastButtonState == HIGH) {
      // save the reading.  Next time through the loop,
      m_lastButtonState = reading;
      m_pressFlag = 0;
      return 1;

    }
  }
  m_lastButtonState = reading;

  return 0;

}


