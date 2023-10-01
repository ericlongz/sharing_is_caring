myArr = [5, 3, 7, 1, 10, 6]

def findSmallest(myArr):
    smallestNum = myArr[0]
    smallestNumIndex = 0
    for i in range(1, len(myArr)):
        if myArr[i] < smallestNum:
            smallestNum = myArr[i]
            smallestNumIndex = i
    return smallestNumIndex

def selectionSort():
    sortedArr = []
    for i in range(0, len(myArr)):
        smallestNumIndex = findSmallest(myArr)
        sortedArr.append(myArr[smallestNumIndex])
        myArr.pop(smallestNumIndex)
    return sortedArr

print(selectionSort())
