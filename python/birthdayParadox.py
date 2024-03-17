import random
import datetime

startDate = datetime.date(2024, 1, 1)
print(startDate)
endDate = datetime.date(2024, 12, 31)
print(endDate)

print((endDate - startDate).days)

birthdayList = []

print("""Birthday Paradox, by Eric ericlongz@ymail.com
--snip--
How many birthdays shall I generate? (Max 100)""")

numPerson = int(input('>'))

for i in range(numPerson):
    print(i)
