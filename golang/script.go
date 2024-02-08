package main

import "fmt"

// contoh command inline
/* contoh command multiline
ini adalah contoh command multiline
*/
func main() {
	fmt.Println("Hello, World!")
	fmt.Println("Please enter your first name.")
	var firstName string
	fmt.Scanln(&firstName)
	fmt.Println("Please enter your last name.")
	var lastName string = fmt.Scanln(&lastName)
	fmt.Printf("Hi, %s %s! I'm Go!", firstName, lastName)
}
