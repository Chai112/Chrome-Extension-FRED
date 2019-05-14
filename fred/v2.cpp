#include "robot-config.h"

int main ()
{
	int c = 0;
	while (true)
	{
		// draw a single pixel at 20, 40
		Brain.Screen.drawLine(sinf(c*180*0.01745329252), cosf(c*180*0.01745329252), 50, 50);
		task::sleep(3);
		Brain.Screen.clearScreen();

		// make eveything drawn from now on have a thiker line
		Brain.Screen.setPenWidth(3);
		c += 50;
	}
}