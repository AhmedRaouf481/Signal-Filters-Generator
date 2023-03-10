from flask import Flask, request
from flask_cors import CORS
import numpy as np
from numpy.lib.function_base import angle
import scipy
import scipy.signal
app = Flask(__name__)

CORS(app)


class db:
    zeros = []
    poles = []
    allZeros = []
    allPoles = []


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
    numerator_coefficients, denominator_coefficients = scipy.signal.zpk2tf(zeros, poles, 1)
    return denominator_coefficients, numerator_coefficients


def maxx(denominator_coefficients, numerator_coefficients):
    if (denominator_coefficients.shape > numerator_coefficients.shape):
        max_length = denominator_coefficients.shape
    else:
        max_length = numerator_coefficients.shape
    return max_length


def equatelength(denominator_coefficients, numerator_coefficients):
    max_length = maxx(denominator_coefficients, numerator_coefficients)
    i = 0
    while(i < max_length[0]):
        if(i < denominator_coefficients.shape[0]):
            denominator_coefficients[i] = denominator_coefficients[i]
        else:
            denominator_coefficients = np.append(denominator_coefficients, [0])
        if(i < numerator_coefficients.shape[0]):
            numerator_coefficients[i] = numerator_coefficients[i]
        else:
            numerator_coefficients = np.append(numerator_coefficients, [0])
        i += 1
    return [denominator_coefficients, numerator_coefficients]
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
#                                 ???????????????????????????????? ????????????????????????????????
#
#               Y[z]       ?? b[n].z^-n       b0 + b1.z^-1 + .... + bM.z^-M
#      H[z] = -------- = --------------- = ---------------------------------, a0 = 1
#               X[z]       ?? a[n].z^-n       1 + a1.z^-1 + .... + aN.z^-N
#
#                                  ???????????????????????????????????????? ????????????????????????????????
#
#                          Y[n] = ?? b[m].X[n-m] - ?? a[m].Y[n-m]
#   -------------------------------------------------------------------------------------
#


def filter(denominator_coefficients, numerator_coefficients, sample_point_index, input_samples, filterd_samples):
    filter_order = maxx(denominator_coefficients, numerator_coefficients)
    if (denominator_coefficients.shape != numerator_coefficients.shape):
        equatelength(denominator_coefficients, numerator_coefficients)
    if (sample_point_index < filter_order[0]):
        return filterd_samples[sample_point_index]

    y_n = numerator_coefficients[0]*input_samples[sample_point_index]
    m = 1
    while (m < filter_order[0]):
        y_n += numerator_coefficients[m]*input_samples[sample_point_index-m] - denominator_coefficients[m]*filterd_samples[sample_point_index-m]
        m += 1

    return y_n.real



def get_yfiltered(signal_x, signal_y, zeros, poles):
    denominator_coefficients, numerator_coefficients = differenceEquationCoefficients(zeros, poles)
    denominator_coefficients, numerator_coefficients = equatelength(denominator_coefficients, numerator_coefficients)
    y_filtterd = signal_y[: denominator_coefficients.shape[0]]
    # filtering
    cnt = 1
    while (cnt < len(signal_x)):
        if (cnt < len(y_filtterd)):
            y_filtterd[cnt] = filter(denominator_coefficients, numerator_coefficients, cnt, signal_y, y_filtterd)
            cnt += 1
        else:
            y_filtterd.append(filter(denominator_coefficients, numerator_coefficients, cnt, signal_y, y_filtterd))
            cnt += 1
    return y_filtterd


########################################### End Points ###########################################
# filter endpoint


@app.route("/api/filter-data", methods=['GET', 'POST'])
def filter_data():

    allpass = request.args.get("allpass")

    # get request data
    data = request.get_json()

    # get filter zeros
    zeros = data['zeros']

    # get filter poles
    poles = data['poles']

    if not allpass:
        db.zeros = zeros
        db.poles = poles

    print(db.zeros, db.poles)
    w, phase, mag = getFrequencyResponce(zeros, poles)
    return {"w": w[1:], "phase": phase[1:], "mag": mag[1:]}, 200


@app.route("/api/add-allpassfilter", methods=['GET', 'POST'])
def add_allpass():

    # get request data
    data = request.get_json()

    # get filter zeros
    db.allZeros = data['zeros']

    # get filter poles
    db.allPoles = data['poles']

    for i in db.zeros:
        db.allZeros.append(i)
    for i in db.poles:
        db.allPoles.append(i)

    w, phase, mag = getFrequencyResponce(db.allZeros, db.allPoles)
    return {"w": w[1:], "phase": phase[1:], "mag": mag[1:]}, 200

# apply filter endpoint


@app.route("/api/apply-filter", methods=['GET', 'POST'])
def apply_filter():

    # get request data
    data = request.get_json()

    # get signal X
    signalX = data['sigX']

    # get signal Y
    signalY = data['sigY']

    if len(db.allZeros) == 0:
        zeros = db.zeros
        poles = db.poles
    else:
        zeros = db.allZeros
        poles = db.allPoles

    print(len(signalX), len(signalY))
    filteredSignalY = get_yfiltered(
        signalX, signalY, zeros, poles)
    return {"filteredSignalY": filteredSignalY}, 200


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
