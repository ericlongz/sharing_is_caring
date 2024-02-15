# import modules
import random

def main():
    # print the description of the game
    print("""Bagels, a deductive logic game.
    By Eric ericlongz@ymail.com
    I am thinking of a 3-digit number. Try to guess what it is.
    Here are some clues:
    When I say:     That means:
    Pico            One digit is correct but in the wrong position.
    Fermi           One digit is correct and in the right position.
    Bagels          No digit is correct.
    I have thought up a number.
    You have 10 guesses to get it.""")

    # generate random 3 digit integer
    secretNum = str(random.randint(100, 999))
    print(secretNum)

    # number of maximum deduction
    deductionLimit = 10

    # loop as much as how many maximum number of deduction
    i = 0
    while i <= deductionLimit:
        if i == 3:
            print('Better Luck Next Time!')
            playAgainAnswer = input(
                'Do you want to play again? (yes or no)\n')
            if playAgainAnswer == 'no':
                print('Thanks for playing!')
                break
            elif playAgainAnswer == 'yes':
                main()
                break
            else:
                print('Please input yes or no value')
                continue

        guessNum = input('Guess #' + str(i + 1) + '\n')

    # Make sure the input is integer
        if guessNum.isdigit():
            # Make sure the input is three digits integer
            if len(guessNum) == 3:
                outputText = ""
                correctNumber = 0
                almostCorrectNumber = 0
                for j in range(3):
                    additionalText = ""
                    for k in range(3):
                        if guessNum[j] == secretNum[k]:
                            if j == k:
                                correctNumber += 1
                                if len(outputText) == 0:
                                    additionalText = "Fermi"
                                    break
                                else:
                                    additionalText = " Fermi"
                                    break
                            else:
                                almostCorrectNumber += 1
                                if len(outputText) == 0:
                                    additionalText = "Pico"
                                else:
                                    additionalText = " Pico"
                        else:
                            pass
                    outputText += additionalText
                if correctNumber == 3:
                    print('You got it')
                    while True:
                        playAgainAnswer = input(
                            'Do you want to play again? (yes or no)\n')
                        if playAgainAnswer == 'no':
                            print('Thanks for playing!')
                            playAgain = False
                            break
                        elif playAgainAnswer == 'yes':
                            playAgain = False
                            main()
                            break
                        else:
                            print('Please input yes or no value')
                            continue
                    break
                elif (correctNumber == 0) & (almostCorrectNumber == 0):
                    print('Bagels')
                    i += 1
                else:
                    print(outputText)
                    i += 1
            else:
                print('Please input 3 digit integer.')
        else:
            print('Please input 3 digit integer.')

main()
