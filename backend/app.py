from flask import Flask, request
from flask_cors import CORS
import numpy as np
from numpy.lib.function_base import angle
import scipy
import scipy.signal
app = Flask(__name__)
CORS(app)


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
        poles_list.append(index)
        zeros_list.append(1/np.conj(index))

    return zeros_list, poles_list


########################################### End Points ###########################################
# filter endpoint
@app.route("/api/filter-data", methods=['GET', 'POST'])
def filter_data():

    # get request data
    data = request.get_json()

    # get filter zeros
    zeros = data['zeros']

    # get filter poles
    poles = data['poles']

    # zeros = [[0, 1]]
    # poles = []
    print(zeros, poles)
    w, phase, mag = getFrequencyResponce(zeros, poles)
    print(w, phase, mag)
    return {"w": w[1:], "phase": phase[1:], "mag": mag[1:]}, 200


if __name__ == '__main__':
    app.run(debug=True)
