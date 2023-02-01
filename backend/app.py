from flask import Flask, request
from flask_cors import CORS
import numpy as np
from numpy.lib.function_base import angle
import scipy
import scipy.signal
app = Flask(__name__)
CORS(app)
