def get_digit_l1(num):
    if num in [0,2,3,5,6,7,8,9]:
        return ' __ '
    elif num in [1,4]:
        return '    '

def get_digit_l2(num):
    if num in [0]:
        return '|  |'
    elif num in [1,7]:
        return '   |'
    elif num in [2,3]:
        return ' __|'
    elif num in [4,8,9]:
        return '|__|'
    elif num in [5,6]:
        return '|__ '

def get_digit_l3(num):
    if num in [0,6,8]:
        return '|__|'
    elif num in [1,4,7]:
        return '   |'
    elif num in [2]:
        return '|__ '
    elif num in [3,5,9]:
        return ' __|'


def main():
    time = input('Input: ')
    try: 
        hr, min, sec = time.split(":")

        # check if the input is in the correct format
        if int(hr)<0 or int(hr)>99 or int(min)<0 or int(min)>59 or int(sec)<0 or int(sec)>59:
            raise Exception()

        # get each of the 6 digits
        h1 = int(hr[0])
        h2 = int(hr[1])
        m1 = int(min[0])
        m2 = int(min[1])
        s1 = int(sec[0])
        s2 = int(sec[1])

        line_1 = get_digit_l1(h1)+' '+get_digit_l1(h2)+' . '+get_digit_l1(m1)+' '+get_digit_l1(m2)+' . '+get_digit_l1(s1)+' '+get_digit_l1(s2)
        line_2 = get_digit_l2(h1)+' '+get_digit_l2(h2)+' . '+get_digit_l2(m1)+' '+get_digit_l2(m2)+' . '+get_digit_l2(s1)+' '+get_digit_l2(s2)
        line_3 = get_digit_l3(h1)+' '+get_digit_l3(h2)+' . '+get_digit_l3(m1)+' '+get_digit_l3(m2)+' . '+get_digit_l3(s1)+' '+get_digit_l3(s2)

        print(line_1)
        print(line_2)
        print(line_3)

    except:
        print('                               ')
        print('          .          .         ')
        print(' __   __  . __   __  .  __   __')
        main()


main()



