from flask import Flask, request
from flask_cors import CORS
import numpy as np
from numpy.lib.function_base import angle
import scipy
import scipy.signal
app = Flask(__name__)

CORS(app)


class db:
    zeros= []
    poles= []


########################################### Methods ###########################################
def To_Complex(pairs):
    complexNumbers = [0]*len(pairs)
    for i in range(len(pairs)):
        x = round(pairs[i][0], 2)
        y = round(pairs[i][1], 2)
        complexNumbers[i] = x + y*1j
    return complexNumbers


def frequencyResponse(zeros, poles, gain):
    w, h = scipy.signal.freqz_zpk(zeros, poles, gain)
    magnitude = 20 * np.log10(np.abs(h))
    angels = np.unwrap(np.angle(h))
    return w/max(w), np.around(angels, decimals=3), np.around(magnitude, decimals=3)


def getFrequencyResponce(zerosArray, polesArray):
    zeros = To_Complex(zerosArray)
    poles = To_Complex(polesArray)
    gain = 1
    # print(zeros, poles, gain)
    w, angles, magnitude = frequencyResponse(zeros, poles, gain)

    return w.tolist(), angles.tolist(), magnitude.tolist()


def all_Pass_Filter(zeros_list, poles_list, a_list):
    for index in a_list:
        print("aaaaaaaaa: ", index)
        if (index.find("+-") != -1):
            index = index.replace("+-", "-")
        a = complex(index)
        poles_list.append([a.real, a.imag])
        aZero = 1/np.conj(a)
        zeros_list.append([aZero.real, aZero.imag])

    return zeros_list, poles_list


def differenceEquationCoefficients(zeros, poles):
    zeros = To_Complex(zeros)
    poles = To_Complex(poles)
    b, a = scipy.signal.zpk2tf(zeros, poles, 1)
    return a, b


def maxx(a, b):
    if (a.shape > b.shape):
        max_length = a.shape
    else:
        max_length = b.shape
    return max_length


def equatelength(a,b):
    max_length=maxx(a,b)
    i=0
    while(i<max_length[0]):
      if(i<a.shape[0]):
        a[i]=a[i]
      else:
        a=np.append(a,[0])
      if(i<b.shape[0]):
        b[i]=b[i]
      else:
        b=np.append(b,[0])
      i+=1
    return [a,b]
#
#  IIR filter implementation of the transfer function H[Z] using the difference equation.
#
#   @param {Array}   a           List of denominator coefficients.
#   @param {Array}   b           List of numerator coefficients.
#   @param {Number}  n           Index of sample point to filter.
#   @param {Array}   x           List of input samples.
#   @param {Array}   y           List of previous filterd samples.
#
#   @return {Number}             The filterd sample value.
#
#   -------------------------------------------------------------------------------------
#                                 𝗧𝗿𝗮𝗻𝘀𝗳𝗲𝗿 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻
#
#               Y[z]       Σ b[n].z^-n       b0 + b1.z^-1 + .... + bM.z^-M
#      H[z] = -------- = --------------- = ---------------------------------, a0 = 1
#               X[z]       Σ a[n].z^-n       1 + a1.z^-1 + .... + aN.z^-N
#
#                                  𝗗𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲 𝗘𝗾𝘂𝗮𝘁𝗶𝗼𝗻
#
#                          Y[n] = Σ b[m].X[n-m] - Σ a[m].Y[n-m]
#   -------------------------------------------------------------------------------------
#


def filter(a, b, n, x, y):
    filter_order = maxx(a, b)
    if (a.shape != b.shape):
        equatelength(a, b)
    if (n < filter_order[0]):
        return y[n]

    y_n = b[0]*x[n]
    m = 1
    while (m < filter_order[0]):
        y_n += b[m]*x[n-m] - a[m]*y[n-m]
        m += 1

    return y_n.real

# plt.plot(signal_x,signal_y)
# plt.show()


def get_yfiltered(signal_x, signal_y, zeros, poles):
    a, b = differenceEquationCoefficients(zeros, poles)
    a, b = equatelength(a, b)
    x = signal_x[0]
    y = signal_y[0]
    y_filtterd = signal_y[: a.shape[0]]
    # filtering
    cnt = 1
    while (cnt < len(signal_x)):
        if (cnt < len(y_filtterd)):
            y_filtterd[cnt] = filter(a, b, cnt, signal_y, y_filtterd)
            cnt += 1
        else:
            y_filtterd.append(filter(a, b, cnt, signal_y, y_filtterd))
            cnt += 1
    return y_filtterd

# y_filtterd=get_yfiltered()
# plt.plot(signal_x,y_filtterd)
# plt.show()

########################################### End Points ###########################################
# filter endpoint


@app.route("/api/filter-data", methods=['GET', 'POST'])
def filter_data():

    # get request data
    data = request.get_json()

    # get filter zeros
    db.zeros = data['zeros']

    # get filter poles
    db.poles = data['poles']

    # zeros = [[0, 1]]
    # poles = []
    # print(zeros, poles)
    w, phase, mag = getFrequencyResponce(db.zeros, db.poles)
    print(w, phase, mag)
    return {"w": w[1:], "phase": phase[1:], "mag": mag[1:]}, 200


# apply filter endpoint
@app.route("/api/apply-filter", methods=['GET', 'POST'])
def apply_filter():

    # get request data
    data = request.get_json()

    # get filter zeros
    # zeros = data['zeros']

    # get filter poles
    # poles = data['poles']

    # get signal X
    signalX = data['sigX']

    # get signal Y
    signalY = data['sigY']

    # print("zeros: ", zeros, "poles: ", poles)
    # TODO: solve imaginary numbers output
    filteredSignalY = get_yfiltered(
        signalX, signalY, db.zeros,db.poles)
    # filteredSignalY = signalY
    # print(filteredSignalY)
    return {"filteredSignalY": filteredSignalY}, 200

# apply filter endpoint


@app.route("/api/allpassfilter", methods=['GET', 'POST'])
def allpassfilter():

    # get request data
    data = request.get_json()

    # get filter zeros
    a = data['a']
    print("a: "+a)
    zeros = []
    poles = []
    all_Pass_Filter(zeros, poles, [a])
    return {"zeros": zeros, "poles": poles}, 200


if __name__ == '__main__':
    app.run(debug=True)
#  [0, 1, 2, 3, 4, 5], [12, 14, 13, 9, 14, 12, 12], [[1,0]], [[1,0]]
