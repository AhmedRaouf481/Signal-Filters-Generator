from flask import Flask
from flask_cors import CORS
import numpy as np
from numpy.lib.function_base import angle
import scipy
import scipy.signal
app = Flask(__name__)
CORS(app)
def To_Complex(pairs):
    complexNumbers = [0]*len(pairs)
    for i in range(len(pairs)):
        x = round(pairs[i][0], 2)
        y = round(pairs[i][1], 2)
        complexNumbers[i] = x+ y*1j
    return complexNumbers

def frequencyResponse(zeros, poles, gain):
    w, h = scipy.signal.freqz_zpk(zeros, poles, gain)
    magnitude = 20 * np.log10(np.abs(h))
    angels = np.unwrap(np.angle(h))
    return w/max(w), np.around(angels, decimals=3), np.around(magnitude, decimals=3)

def getFrequencyResponce():
        zeros = To_Complex([(0,1),(1,0)])
        poles = To_Complex([(0,0)])
        gain = 1
        print(zeros, poles, gain)
        w, angles, magnitude = frequencyResponse(zeros, poles, gain)
       
        return w, angles, magnitude

def all_Pass_Filter(zeros_list, poles_list, a_list):
    for index in a_list:
        poles_list.append(index)
        zeros_list.append(1/np.conj(index))

    return zeros_list, poles_list        

w, angles, magnitude= getFrequencyResponce()
print(w,angles,magnitude)



# filter endpoint
@app.route("/api/filter", methods=['POST'])
def filter():
    # TODO: implement filter

    return {"result": ""}, 200


if __name__ == '__main__':
    app.run(debug=True)
