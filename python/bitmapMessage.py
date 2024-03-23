print("""Bitmap Message, by Eric ericlongz@ymail.com
Enter the message to display with the bitmap.""")

txt = list(input('> '))
print("")

with open('bitmapWorld.rtf', 'r') as infile:
    for line in infile:
        linetmp = ""
        txttmp = txt.copy()
        for i in line:
            if len(txttmp) == 0:
                txttmp = txt.copy()
            else:
                pass
            if i.isspace() == True:
                linetmp = linetmp + ' '
                txttmp.pop(0)
            else:
                linetmp = linetmp + txttmp[0]
                txttmp.pop(0)
        print(linetmp)
