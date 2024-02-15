# import modules
import random

# number of maximum deduction
deductionLimit = 10
NUM_DIGITS = 3

def main():
    # print the description of the game
    print("""Bagels, a deductive logic game.
By Eric ericlongz@ymail.com
          
I am thinking of a {}-digit number. Try to guess what it is.
Here are some clues:
When I say:     That means:
Pico            One digit is correct but in the wrong position.
Fermi           One digit is correct and in the right position.
Bagels          No digit is correct.
          
For example, if the secret number was 248 and your guess was 843, the clues would be Fermi Pico.""".format(NUM_DIGITS))

    while True:  # Main game loop.
        # This stores the secret number the player needs to guess:
        secretNum = getSecretNum()
        print('I have thought up a number.')
        print('You have {} guesses to get it.'.format(deductionLimit))

        # loop as much as how many maximum number of deduction
        i = 1
        while i <= deductionLimit:
            guess = ''
            # Keep looping until they enter a valid guess:
            while len(guess) != NUM_DIGITS or not guess.isdecimal():
                print('Guess #{}'.format(i))
                guess = input('> ')

            clues = getClues(guess, secretNum)
            print(clues)
            i += 1

            if guess == secretNum:
                break  # They're correct, so break out of this loop.
            if i > deductionLimit:
                print('You ran out of guesses.')
                print('The answer was {}.'.format(secretNum))

        # Ask player if they want to play again.
        print('Do you want to play again? (yes or no)')
        if not input('> ').lower().startswith('y'):
            break
    print('Thanks for playing!')

def getSecretNum():
    """Returns a string made up of NUM_DIGITS unique random digits."""
    numbers = list('0123456789')  # Create a list of digits 0 to 9.
    random.shuffle(numbers)  # Shuffle them into random order.

    # Get the first NUM_DIGITS digits
    secretNum = ''
    for i in range(NUM_DIGITS):
        secretNum += str(numbers[i])
    return secretNum

def getClues(guess, secretNum):
    """Returns a string with the pico, fermi, bagels clues for a guess and secret number pair"""
    if guess == secretNum:
        return 'You got it!'

    clues = []

    for i in range(len(guess)):
        if guess[i] == secretNum[i]:
            # A correct digit is in the correct place.
            clues.append('Fermi')
        elif guess[i] in secretNum:
            # A correct digit is in the incorrect place.
            clues.append('Pico')
    if len(clues) == 0:
        return 'Bagels'  # There are no correct digits at all.
    else:
        # Sort the clues into alphabetical order so their original order
        # doesn't give information away.
        clues.sort()
        # Make a single string from the list of string clues.
        return ' '.join(clues)

# If the program is run (instead of imported), run the game:
if __name__ == '__main__':
    main()
