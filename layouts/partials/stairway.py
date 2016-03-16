def Stairway(n):
    a,b = 1,1
    for i in range(n):
        a,b = b,(a+b) % 1000000007
    print a
    return a% 1000000007
Stairway(9999999)