import random
import datetime

startDate = datetime.date(2023, 12, 31)
# endDate = datetime.date(2024, 12, 31)
# print(endDate)
# numDays = (endDate - startDate).days

print("""Birthday Paradox, by Eric ericlongz@ymail.com
--snip--
How many birthdays shall I generate? (Max 100)""")

numPerson = int(input('> '))

def genBirthday(numPerson):
    birthdayList = []
    for i in range(numPerson):
        randDays = random.randint(1, 366)
        randomDate = (startDate + datetime.timedelta(days=randDays)
                      ).strftime('%m%d')
        birthdayList.append(randomDate)
    return birthdayList

def findMatchedBirthday(birthdayList):
    birthdaySet = set(birthdayList)

    if len(birthdaySet) != len(birthdayList):
        return 1
    else:
        return 0

def runSimulation(numOfSimulation, numPerson):
    print("""Let's run another {} simulations.
0 simulations run...""".format(numOfSimulation))
    counter = 0
    for i in range(1, numOfSimulation + 1):
        if i == 10000:
            print("""{} simulations run...
--snip--""".format(i))
        elif i == 90000:
            print("""{} simulations run...""".format(i))
        counter = counter + findMatchedBirthday(genBirthday(numPerson))

    probability = round(counter / numOfSimulation * 100, 2)
    print("""{} simulations run.
Out of {} simulations of {} people, there was a
matching birthday in that group {} times. This means
that {} people have a {} % chance of
having a matching birthday in their group.
That's probably more than you would think!""".format(numOfSimulation, numOfSimulation, numPerson, counter, numPerson, probability))

birthdaySample = genBirthday(numPerson)
seen = set()
dupes = [x for x in birthdaySample if x in seen or seen.add(x)]
print("""Here are {} birthdays:
{}
In this simulation, multiple people have a birthday on {}""".format(numPerson, birthdaySample, dupes))

numOfSimulation = 100000

print("""Generating {} random birthdays {} times...""".format(
    numPerson, numOfSimulation))

if input('Press Enter to begin...') == '':
    runSimulation(numOfSimulation, numPerson)
