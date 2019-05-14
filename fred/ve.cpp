#include "robot-config.h"
  // TK likes spaces instead of tabs 

// Chaidhat C
// Tk
// 8 May, 2019 (c) all rights reserved
// does task 3
// https://community.patana.ac.th/computing/topics/robotics/2019-block-4-dabr-notes/week-3
// print string

void print(String in);
void turnMotor(int percentage, float time);
void run();

// prints string
void print(String in)
{
  	Brain.Screen.print(in);
  	Brain.Screen.newLine();
} //print

// turns motor at a percentage of max speed for a length of time.
void turnMotor(int percentage, float time)
{
  	Motor1.setVelocity(percentage, velocityUnits::pct); // Forward 25% speed 4 seconds, 
  	vex::task::sleep(time * 1000);
} //turnMotor

// will perform task 3
void run()
{
  	Motor1.spin(directionType::fwd);  // set forwards


  	turnMotor(25, 4); // Forward 25% speed 4 seconds, 
  	turnMotor(75, 4); // forward 75% speed 4 seconds, 
  	turnMotor(25, 4); // forward 25% speed 4 seconds,
  	turnMotor(0, 5);  // Stop 5 seconds
  	turnMotor(50, 4); // Back 50% speed 4 seconds

  	Motor1.stop(); //stops the motor
} //run



int main() 
{
      	
  	print("TK Sucks Program init");
  	run(); // run task 3
  	print("Program Terminated. :D"); // End.

    // Chaidhat C because I did all the work.
}//main